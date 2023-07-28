import mongoose from 'mongoose';
import jwt from 'jwt-simple';
import Locals from '../providers/locals';

interface UserProfile {
    _id?: mongoose.Types.ObjectId
}
interface TokenPayload{
    sub: mongoose.Schema.Types.ObjectId
  }
type CallBackFunction = (param1: string, param2?: TokenPayload)=>{};

const token = {
    generateToken (user: UserProfile) {
        const timeStamp = Date.now();
        const payload = {
            sub: user._id
        }
        return jwt.encode(payload, Locals.config().jwtSecret);
    },
    verifyToken (inputToken: string, cb:CallBackFunction) {
        const decode = jwt.decode(inputToken, Locals.config().jwtSecret)
        if (!decode) return cb('Token is not verified.');
        cb(null, decode);
    }
}

export {token}