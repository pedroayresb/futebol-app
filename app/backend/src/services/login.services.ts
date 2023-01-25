import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import UserModel from '../database/models/Users';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

type LoginServiceProps = {
  id?: number;
  email?: string;
  password?: string;
};

class LoginService {
  private id?: number;
  private email?: string;
  private password?: string;

  constructor({ id, email, password }: LoginServiceProps) {
    this.id = id;
    this.email = email;
    this.password = password;
  }

  async loginUser() {
    const user = await UserModel.findOne({ where: { email: this.email } });
    if (!user) {
      return null;
    }
    const isPasswordCorrect = bcrypt.compareSync(this.password as string, user.password);
    if (!isPasswordCorrect) {
      console.log('Incorrect password');
      return null;
    }
    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: 60 * 60 * 24 * 7,
      algorithm: 'HS256',
    });

    return token;
  }

  async getRole() {
    const user = await UserModel.findOne({ where: { id: this.id } });
    if (!user) {
      return null;
    }
    return user.role;
  }
}

export default LoginService;
