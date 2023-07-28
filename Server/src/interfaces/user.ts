import mongoose from "mongoose";

export type comparePasswordFunction = (
  candidatePassword: string,
  cb: (err: Error, isMatch: boolean) => void
) => void;

export type UserDocument = mongoose.Document & {
  _id: mongoose.Schema.Types.ObjectId;
  email: string;
  password: string;
  fullName: string;
  phone: string;
  avatar: string;
  isAdmin: boolean;
  token: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: comparePasswordFunction;
};
export default UserDocument;
