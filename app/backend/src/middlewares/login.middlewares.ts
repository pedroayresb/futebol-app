import { Request, Response, NextFunction } from 'express';
import { UserInterface } from '../interfaces/users.interfaces';

const validateEmail = (req: Request, res: Response, next: NextFunction) => {
  const { email }: UserInterface = req.body;

  // eslint-disable-next-line max-len
  const emailRegex = /^[\w-]{5,}@.*$/;
  if (!email) {
    return res.status(400).json({ error: 'All fields must be filled' });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Email must be a valid email' });
  }
  if (typeof email !== 'string') {
    return res.status(400).json({ error: 'Email must be a string' });
  }

  next();
};

const validatePassword = (req: Request, res: Response, next: NextFunction) => {
  const { password }: UserInterface = req.body;

  if (!password) {
    return res.status(400).json({ error: 'All fields must be filled' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }

  if (typeof password !== 'string') {
    return res.status(400).json({ error: 'Password must be a string' });
  }

  next();
};

export { validateEmail, validatePassword };
