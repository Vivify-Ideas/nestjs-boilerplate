import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

const isCompiled = __filename.endsWith('.js');
const sourceRoot = isCompiled ? 'dist' : 'src';
const extension = isCompiled ? 'js' : 'ts';

export const dataSourceOptions: DataSourceOptions = {
  type: (process.env.DB_TYPE || 'mysql') as 'mysql' | 'mariadb',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [`${sourceRoot}/**/*.entity.${extension}`],
  migrations: [`${sourceRoot}/migrations/*.${extension}`],
  synchronize: process.env.DB_SYNC === 'true',
};

export default new DataSource(dataSourceOptions);
