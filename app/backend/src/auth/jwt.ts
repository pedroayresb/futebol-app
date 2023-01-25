import * as jwt from 'jsonwebtoken';
import { UserInterface } from '../interfaces/users.interfaces';

export default class JWT {
  public static createToken(data: UserInterface): string {
    const token = jwt.sign({ id: data.id }, 'jwt_secret', {
      expiresIn: 60 * 60 * 24 * 7,
      algorithm: 'HS256',
    });

    return token;
  }

  public static verifyToken(token: string) {
    try {
      return jwt.verify(token, 'jwt_secret');
    } catch (err) {
      return null;
    }
  }
}
