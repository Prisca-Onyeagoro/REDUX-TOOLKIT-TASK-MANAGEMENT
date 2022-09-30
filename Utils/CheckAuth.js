import jwt from 'jsonwebtoken';
import { CreateError } from './ErrorHandler.js';

export const CheckAuth = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(CreateError({ status: 401, message: 'Unauthorized' }));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(CreateError({ status: 401, message: 'Invalid credentials' }));
    }
    req.user = decoded;
    return next();
  });
};
