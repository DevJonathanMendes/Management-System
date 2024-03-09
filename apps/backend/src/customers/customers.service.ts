import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Pool } from 'pg';
import { PG_POOL } from 'src/db/db.module';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerEntity } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(@Inject(PG_POOL) private pool: Pool) {}

  async create(data: CreateCustomerDto): Promise<CustomerEntity> {
    try {
      const textQuery = this.createInsertQuery(data);
      const { rows } = await this.pool.query(textQuery);

      return rows[0];
    } catch (err) {
      throw new InternalServerErrorException(['try again later']);
    }
  }

  async findOneByEmail(email: string): Promise<CustomerEntity> {
    try {
      const { rows } = await this.pool.query(
        `SELECT * FROM customers WHERE email='${email}'`,
      );

      return rows[0];
    } catch (err) {
      throw new InternalServerErrorException(['try again later']);
    }
  }

  async findAnyByName(name: string): Promise<CustomerEntity[]> {
    try {
      const { rows } = await this.pool.query(
        `SELECT * FROM customers WHERE name='${name}'`,
      );

      return rows;
    } catch (err) {
      throw new InternalServerErrorException(['try again later']);
    }
  }

  async findAll() {
    try {
      const { rows } = await this.pool.query('SELECT * FROM customers');
      return rows;
    } catch (err) {
      throw new InternalServerErrorException(['try again later']);
    }
  }

  createInsertQuery(data: CreateCustomerDto) {
    const columns = Object.keys(data);
    const values = Object.values(data);
    const placeholders = columns.map((_, index) => `$${index + 1}`).join(', ');

    return {
      text: `INSERT INTO customers (${columns.join(', ')}) VALUES (${placeholders}) RETURNING *`,
      values: values,
    };
  }
}
