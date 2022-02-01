import jwt from 'jsonwebtoken';
import config from 'config';
import authTokenPayload from '../types/token.type';
import { NextFunction, Request, Response } from 'express';

declare module 'jsonwebtoken' {
  export interface JwtPayload {
    user: { id: string; role: string };
  }
}

export function authUser(req: Request, res: Response, next: NextFunction) {
  //get bearer token from header
  const token: string | undefined = req.header('Authorization')?.split(' ')[1];

  //check if received token
  if (!token) return res.status(401).send('No token, authorization denied');

  try {
    //decodes token
    const decoded: authTokenPayload = jwt.verify(
      token,
      config.get('jwt')
    ) as authTokenPayload;

    //save in response
    res.locals.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).send('Token is not valid');
  }
}

export function authAdmin(req: Request, res: Response, next: NextFunction) {
  //check if user is admin
  const { role } = res.locals.user;

  if (role === 'admin') {
    return next();
  }

  res.status(401).send('Admin permission required');
}
