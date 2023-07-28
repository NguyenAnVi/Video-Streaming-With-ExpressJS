import {token} from '../util/token'
import { Request, Response, NextFunction } from 'express';
import { Schema } from 'mongoose';
import UserDocument from '../interfaces/user';
import UserModel from '../models/user.model';

interface TokenPayload{
  sub: Schema.Types.ObjectId,
  role: string,
}

interface ModRequest extends Request{
  user: UserDocument
}

export const loginRequired = (req:ModRequest, res:Response, next:NextFunction) => {
  if (!req.header('Authorization')) return res.status(401).send({message: 'Please make sure your request has an Authorization header.'});
  // Validate jwt
  const tryToken = req.header('Authorization').split(' ')[0];
  token.verifyToken(tryToken, (err:string, payload:TokenPayload) => {
    if (err) return res.status(401).json({
      status: false, 
      message: err
    });
    UserModel.findById(payload.sub)
      .then(async (result) => {
        if (!result) {
          return res.status(404).json({
            status: false,
            message: 'Middleware error: User not found!!!'
          });
        }
        req.user = result;
        req.user.password = undefined;
        next();
      })
  })
}