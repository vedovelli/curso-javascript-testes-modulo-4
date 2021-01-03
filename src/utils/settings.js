/* istanbul ignore file */
import dotenv from 'dotenv';
dotenv.config();

/**
 * Este é apenas um wrapper no arquivo .env para que não seja necessário
 * utilizar process.env.DATABASE_PATH por exemplo. Isso facilita obter
 * uma referência direta à contante.
 */
const { DATABASE_PATH, PORT } = process.env;

export { DATABASE_PATH, PORT };
