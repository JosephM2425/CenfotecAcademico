import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "mssql",
  schema: "./drizzle/schema.ts",
  out: "./drizzle",
  introspect: {
    casing: "camel",
  },
  dbCredentials: {
    server: process.env.DB_SERVER!,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_DATABASE!,
    options: {
      trustServerCertificate: true,
    },
  },
});
