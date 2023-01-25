import jwt from '../auth/jwt';
import bcrypt from '../auth/Bcrypt';
import UserModel from '../database/models/Users';

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
    const isPasswordCorrect = bcrypt.compare(this.password as string, user.password);
    if (!isPasswordCorrect) {
      return null;
    }
    const token = jwt.createToken(user);
    return { token };
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
