import { Request, Response } from 'express';
import LoginService from '../services/login.services';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const token = await new LoginService({ email, password }).loginUser();
  if (!token) {
    return res.status(401).json({ error: 'Incorrect email or password' });
  }
  return res.status(200).json(token);
};

const validate = async (req: Request, res: Response) => {
  const { user } = res.locals;
  const role = await new LoginService({ id: user.id }).getRole();
  return res.status(200).json({ role });
};

export { login, validate };
