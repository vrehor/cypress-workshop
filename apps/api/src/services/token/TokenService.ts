import jwt from 'jsonwebtoken';
import { Service } from 'typedi';

@Service()
export class TokenService {
  create(tokenData: { user_id: number }): string {
    return jwt.sign(tokenData, process.env.NX_TOKEN_KEY || '', {
      expiresIn: '2h',
      algorithm: 'HS256',
    });
  }
}
