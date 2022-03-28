import { TypeOrmModule } from '@nestjs/typeorm';

export function getPgTestTypeOrmModule() {
  const connectionTimeout = 2000; // 2초
  return TypeOrmModule.forRoot({
    maxQueryExecutionTime: connectionTimeout,
    extra: {
      statement_timeout: connectionTimeout,
      min: 1,
      max: 5,
    },
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'test',
    password: 'test',
    database: 'test',
    entities: [],
  });
}
