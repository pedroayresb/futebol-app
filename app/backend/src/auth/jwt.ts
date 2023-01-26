import * as jwt from 'jsonwebtoken';
import LoginInterface from '../interfaces/login.interfaces';

export default class JWT {
  public secret;

  constructor(jwtSecret: string) {
    this.secret = jwtSecret;
  }

  public createToken(data: LoginInterface): string {
    const token = jwt.sign(data, this.secret, {
      expiresIn: 60 * 60 * 24 * 7,
      algorithm: 'HS256',
    });

    return token;
  }
}
