import { Request, Response, NextFunction } from 'express';
import { UserInterface } from '../interfaces/users.interfaces';

const ALL_FIELDS_MUST_BE_FILLED = 'All fields must be filled';
const INCORRECT_EMAIL_OR_PASSWORD = 'Incorrect email or password';

const validateEmail = (req: Request, res: Response, next: NextFunction) => {
  const { email }: UserInterface = req.body;

  if (!email) {
    return res.status(400).json({ error: ALL_FIELDS_MUST_BE_FILLED });
  }

  const emailRegex = /^[\w-]{5,}@.*$/;
  if (!emailRegex.test(email)) {
    return res.status(401).json({ error: INCORRECT_EMAIL_OR_PASSWORD });
  }

  next();
};

const validatePassword = (req: Request, res: Response, next: NextFunction) => {
  const { password }: UserInterface = req.body;

  if (!password) {
    return res.status(400).json({ error: ALL_FIELDS_MUST_BE_FILLED });
  }
  if (password.length < 6) {
    return res.status(401).json({ error: INCORRECT_EMAIL_OR_PASSWORD });
  }

  next();
};

export { validateEmail, validatePassword };
