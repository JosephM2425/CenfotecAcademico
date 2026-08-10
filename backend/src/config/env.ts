import "dotenv/config";

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Falta la variable de entorno ${name}`);
  return value;
}

export const env = {
  PORT: Number(process.env.PORT ?? 3000),
  FRONTEND_URL: process.env.FRONTEND_URL ?? "http://localhost:5173",
  CLERK_PUBLISHABLE_KEY: required("CLERK_PUBLISHABLE_KEY"),
  CLERK_SECRET_KEY: required("CLERK_SECRET_KEY"),
  DB_SERVER: required("DB_SERVER"),
  DB_PORT: Number(required("DB_PORT")),
  DB_USER: required("DB_USER"),
  DB_PASSWORD: required("DB_PASSWORD"),
  DB_DATABASE: required("DB_DATABASE"),
  OPEN_ALEX_API_KEY: process.env.OPEN_ALEX_API_KEY,
};
