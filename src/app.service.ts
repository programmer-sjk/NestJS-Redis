import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectEntityManager() private manager: EntityManager,
  ) {}


  async findUser(id: number): Promise<string> {
    const r = await this.manager.query(`SELECT * FROM users WHERE id = ${id}`);
    console.log(r);
    return 'Hello World!';
  }
}
