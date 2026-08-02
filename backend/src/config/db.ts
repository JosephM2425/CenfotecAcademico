import mssql from "mssql";
import { drizzle } from "drizzle-orm/node-mssql";
import { env } from "./env.js";
import * as schema from "../models/index.js";

const pool = new mssql.ConnectionPool({
  server: env.DB_SERVER,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  options: {
    trustServerCertificate: true,
  },
});

export const db = drizzle({ client: pool, schema });

export async function connectDb() {
  await pool.connect();
}
