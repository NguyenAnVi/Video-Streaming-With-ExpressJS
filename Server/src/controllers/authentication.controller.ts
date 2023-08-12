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
      .send({ message: 'You must provide email and password.' });
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
                  return res.status(401).json({ 
                    message: "Wrong password or phone number" })
                }
                const token = Token.generateToken(result);
                result.token = token;
                result.save()
                .then(()=>{
                  return res.json({
                    fullName:result.fullName,
                    avatar:result.avatar,
                    id:result._id,
                    phone:result.phone,
                    email:result.email,
                    accessToken:token
                  });
                })
              }
            )
          } else {
            return res.status(401).json({
              message:"unauthorized"
            })
          }
        }
      );
  }
}

export const signup = async (req: Request, res:Response, next:NextFunction):Promise<Response> => {
  const { phone, password, confirmPassword, name, email } = req.body;
  if (!email || !password || !name || !confirmPassword || !phone) {
    return res
      .status(422)
      .send({ message: 'You must provide name, phone, password and confirm your new password.' });
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
            .json({ message: 'Phone or email is in use' });
        } else {
          const user = new UserModel({
            fullName:name ,
            phone,
            password,
            email
          });
          const token = Token.generateToken(user);
          user.token = token;

          user
            .save()
            .then((savedResult:UserDocument) => {
              return res.json({
                status: true,
                message:"Signup complete, from now you can signin with this account."
              })
            })
            .catch((err:Error) => {
              return res.status(500).json({
                message:"Error while register new account :"+err.message
              });
            })
        } // if (result) else
      } // function (result)
    ) // then
}