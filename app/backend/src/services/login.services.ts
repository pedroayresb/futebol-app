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
    const user = await UserModel.findOne({ where: { _email: this.email } });
    if (!user) {
      return null;
    }
    const isPasswordCorrect = bcrypt.compareSync(this.password as string, user._password);
    if (!isPasswordCorrect) {
      return null;
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
    return { token };
  }

  async getRole() {
    const user = await UserModel.findOne({ where: { _id: this.id } });
    if (!user) {
      return null;
    }
    return user._role;
  }
}

export default LoginService;
