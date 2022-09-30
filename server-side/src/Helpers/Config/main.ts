import * as dotenv from 'dotenv'
dotenv.config()

export const config = {
  NODE_PORT: process.env.NODE_PORT,
  NODE_ENV: process.env.NODE_ENV,
  DB_CONNECTION: process.env.DB_CONNECTION
}
