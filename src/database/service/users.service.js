import { appError } from '@/utils';
import { logger } from '@/utils';
import { User } from '@/database/models/user.model';

export async function listUsers() {
  try {
    return await User.findAll();
  } catch (error) {
    /**
     * Ao rejeitar a Promise com um erro, este será
     * capturado no controller que então o encaminhará
     * no método next(), fazendo com que ultimamente
     * ele chegue no gerenciador central de erros e
     * de volta ao client que fez a requisição.
     */
    return Promise.reject(appError('Failed to retrieve users'));
  }
}

export async function findOrSave(email) {
  try {
    const user = await User.findOrCreate({ where: { email } });
    logger.info(`User located or created with email: ${email}`);
    return user;
  } catch (error) {
    /**
     * Ao rejeitar a Promise com um erro, este será
     * capturado no middleware que então o encaminhará
     * no método next(), fazendo com que ultimamente
     * ele chegue no gerenciador central de erros e
     * de volta ao client que fez a requisição.
     */
    return Promise.reject(
      appError(`Failed to retrieve or save user with email: ${email}`),
    );
  }
}

export async function saveUser(data) {
  if (!data) {
    return Promise.reject(appError('Failed to save user'));
  }
  return await User.create({
    email: data.email,
  });
}
