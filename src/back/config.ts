import dotenv from 'dotenv';
dotenv.config();

import pkg from 'pg';
const { Pool } = pkg;

const dsn = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: String(process.env.DB_PASSWORD),
    database: process.env.DATABASE,
});

export const db = {
  query: (text: string, params?: any[]) => dsn.query(text, params),
};
