import { writeFile } from "fs";
import {token as Token} from '../util/token';
import UserModel from '../models/user.model';
import UserDocument from '../interfaces/user';
import Locals from '../../src/providers/locals';
import { Request, Response } from 'express';

export const signin = async (req: Request, res:Response) => {
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

export const signup = async (req: Request, res:Response):Promise<Response> => {
  const { phone, password, confirmPassword, name, email } = req.body;
  if (!email || !password || !name || !confirmPassword || !phone) {
    return res
      .status(422)
      .send({ message: 'You must provide name, phone, password and confirm your new password.' });
  }
  if (password !== confirmPassword){
    return res
      .status(422)
      .send({ message: 'Confirm password do not match.' });
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
export const updateProfile = async (req: any, res:Response):Promise<Response> => {
  const { phone, currentpassword, newpassword, name, email } = req.body;
  if (newpassword && !currentpassword) {
    return res
      .status(422)
      .send({ message: 'You must provide current password and confirm your new password.' });
  } else {
    var newData = {
      fullName:name,
      phone,
      email
    }
    await UserModel
      .findByIdAndUpdate( req.user._id, newData)
      .then(
        (result: UserDocument) => {
          if (result) {
            const token = Token.generateToken(result);
            result.token = token;
            result.save();

            if(newpassword){
              result.comparePassword(
                currentpassword,
                function(err, isMatch){
                  if(!err && isMatch===true){
                    console.log(newpassword);
                    result.password = newpassword;
                    result.save();
                    return res
                      .status(200)
                      .json({
                        message:"Update profile successfully.",
                        user: {
                          ...newData,
                          accessToken:token
                        },
                    });
                  } else {
                    return res.status(422).json({
                      message: "Can not update profile due to unauthorized"
                    });
                  }
                }
              );
            } else {
              return res
                .status(200)
                .json({
                  message:"Update profile successfully.",
                  user: {
                    ...newData,
                    accessToken:token
                  },
              });
            }

            
          } else {
            return res
              .status(404)
              .json({ message: 'User not found' });
          } // if (result) else
        } // function (result)
      ) // then
      .catch(err=>{
        console.log(err);
        return res.status(500).json({
          message:err.message
        })
      })
  }
  
}
export const updateAvatar = async (req: any, res:Response) => {
  setTimeout(() => {
    const __hostname = Locals.config().hostname;
    const __port = Locals.config().port;
    var base64Data = req.body.avatar.replace(/^data:image\/png;base64,/, "");
    const filepath = './public/storage/avatar/';
    const filename = 'user_'+req.user._id+'.png';
    const publicpath = __hostname + ':' + __port + '/storage/avatar/'+filename;
    writeFile(filepath+filename, base64Data, {
      encoding:'base64',
      flag:'w+'
    }, function(werr) {
      if(werr){
        console.log(werr);
        return res.status(500).json({
          message:werr.message,
        });
      } else {
        UserModel.findByIdAndUpdate(req.user._id,{
          avatar:publicpath
        })
        .then((result)=>{
          if(result){
            return res.status(200).json({
              message:"Avatar updated!",
              avatar:publicpath
            });
          } else {
            return res.status(404).json({
              message:"User not found!"
            });
          }
        })
        .catch(err=>res.status(500).json({message:err.message}));
      }
    });
  }, 5000);
}