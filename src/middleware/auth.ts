import jwt from 'jsonwebtoken';
import config from 'config';
import { NextFunction, Request, Response } from 'express';

export function authUser(req: Request, res: Response, next: NextFunction) {
  //get bearer token from header
  const token: string | undefined = req.header('Authorization')?.split(' ')[1];

  if (!token) return res.status(401).send('No token, authorization denied');

  try {
    const decoded: string | jwt.JwtPayload = jwt.verify(
      token,
      config.get('jwt')
    );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    res.locals.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).send('Token is not valid');
  }
}
