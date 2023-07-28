import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user.model";
import UserDocument from "../interfaces/user";
import {token as Token} from '../util/token'

export const signin = async (req: Request, res:Response, next: NextFunction) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!req.body.email || !req.body.password) {
    return res
      .status(422)
      .send({ error: 'You must provide email and password.' });
  }
  else {
    await UserModel
      .findOne({
        email: email
      })
      .then(
        (result: UserDocument) => {
          if (result) {
            result.comparePassword( 
              password, 
              (err:Error, isMatch: boolean) => {
                if (err || !isMatch) {
                  return res.status(401).send({ 
                    status:false, 
                    message: err.message ||   "Wrong password or phone number" })
                }
                const token = Token.generateToken(result);
                return res.json({
                  status: true,
                  token
                });
              }
            )
          } else {
            return res.status(401).json({
              status:false,
              message:"unauthorized"
            })
          }
        }
      );
  }
}

export  const signup = async (req: Request, res:Response, next:NextFunction):Promise<Response> => {
  const { phone, password, confirmPassword, name, email } = req.body;
  if (!email || !password || !name || !confirmPassword || !phone) {
    return res
      .status(422)
      .send({ error: 'You must provide name, phone, password and confirm your new password.' });
  }
  UserModel
    .findOne({
      $or : [
        { phone: phone },
        { email: email }
      ]
    })
    .then(
      (result: UserDocument) => {
        if (result) {
          return res
            .status(422)
            .send({ error: 'Phone or email is in use' });
        } else {
          const user = new UserModel({
            name ,
            phone,
            password,
            email
          });
          const token = Token.generateToken(user);
          user.token = token;

          user
            .save()
            .then((savedResult:UserDocument) => {
              res.json({
                status: true,
                token
              })
            })
            .catch((err:Error) => {
              res.status(500).json({
                status:false,
                message:"Error while signin :"+err.message
              });
            })
        } // if (result) else
      } // function (result)
    ) // then
}

export const test = (req: any, res:any, next:NextFunction)=>{
  return res.status(200).json({status:true, message:"Success"})
}