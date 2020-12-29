import dotenv from 'dotenv';
dotenv.config();

const { DATABASE_PATH, PORT } = process.env;

export { DATABASE_PATH, PORT };
