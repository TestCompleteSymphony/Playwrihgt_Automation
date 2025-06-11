
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import sql from 'mssql';

const config = {
  user: process.env.MSSQL_USER,
  password: process.env.MSSQL_PASSWORD,
  server: process.env.MSSQL_SERVER,
  database: process.env.MSSQL_DATABASE,
  port: parseInt(process.env.MSSQL_PORT) || 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

let pool = null;

export async function getDbPool() {
  if (!pool) {
    pool = sql.connect(config);
  }
  return pool;
}