import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';


const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    res.locals.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default validateToken;
