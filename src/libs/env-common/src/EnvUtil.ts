import { ConfigModule } from '@nestjs/config';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { DynamicModule } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { Environment } from './env/Environment';

export class EnvUtil {
  private static env?: Environment;

  static getConfigModule(): DynamicModule {
    return ConfigModule.forRoot({
      isGlobal: true,
      load: [EnvUtil.getYamlLoader()],
    });
  }

  static getEnv(nodeEnv?: string): Environment {
    if (EnvUtil.env) {
      return EnvUtil.env;
    }

    const loadYaml = EnvUtil.getYamlLoader(nodeEnv);
    EnvUtil.env = EnvUtil.validate(loadYaml());

    return EnvUtil.env;
  }

  private static getYamlLoader(nodeEnv = process.env.NODE_ENV) {
    const suffix = !nodeEnv || nodeEnv === 'test' ? 'local' : nodeEnv;

    return () =>
      yaml.load(
        readFileSync(join(__dirname, `../../../env/env.${suffix}.yml`), 'utf8'),
      ) as Record<string, unknown>;
  }

  private static validate(config: Record<string, unknown>) {
    const validatedConfig = plainToClass(Environment, config, {
      enableImplicitConversion: false,
    });
    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }

    return validatedConfig;
  }
}
