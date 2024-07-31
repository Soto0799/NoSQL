import { createToken } from '../repositories/tokensRepository.js';

export const postToken = async (token) => {
    const result = await createToken(token);
    return result && result.insertedId;
}