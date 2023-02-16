import JWT from '../auth/jwt';
import Bcrypt from '../auth/bcrypt';
import UserModel from '../database/models/Users';

const JWT_SECRET = process.env.JWT_SECRET as string;

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
    const isPasswordCorrect = Bcrypt.compare(this.password as string, user.password);
    if (!isPasswordCorrect) {
      return null;
    }
    const token = new JWT(JWT_SECRET).createToken({ id: user.id, role: user.role });

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
