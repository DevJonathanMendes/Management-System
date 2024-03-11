import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';

export const PG_POOL = 'PG_POOL';

const DbProvider = {
  provide: PG_POOL,
  useValue: new Pool({
    user: 'postgres',
    password: 'postgres',
    database: 'db',
    host: 'localhost',
    port: 5432,
  }),
};

@Module({
  providers: [DbProvider],
  exports: [DbProvider],
})
export class DbModule implements OnModuleInit {
  constructor(@Inject(PG_POOL) private pool: Pool) { }

  async onModuleInit() {
    await this.pool.query(`
      CREATE TABLE IF NOT EXISTS customers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(64),
        email VARCHAR(64) UNIQUE,
        telephone VARCHAR(32),
        coordinate_x INT,
        coordinate_y INT,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP		
      );
		`);
  }
}
