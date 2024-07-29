import dotenv from 'dotenv';
dotenv.config();

dotenv.config();

export default {
  dialect: "postgresql",
  schema: "./db/schema.js",
  out: "./db/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
} 