import mongoose from "../providers/database";
import UserDocument, { comparePasswordFunction } from "../interfaces/user";
import bcrypt from "bcrypt";

// Define the model
const UserSchema = new mongoose.Schema<UserDocument>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      validate: {
        validator(v: string) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        },
        message: (props: { value: any }) =>
          `${props.value} is not a valid email address!`,
      },
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      unique: true,
      sparse: true,
      validate: {
        validator(v: string) {
          return /^[0-9]{10}$/.test(v);
        },
        message: (props: { value: any }) =>
          `${props.value} is not a valid phone number!`,
      },
    },
    avatar: { type: String },
    fullName: { type: String },
    isAdmin: { type: Boolean, default: false },
    token: { type: String },
  },
  { timestamps: true, collection: "User" }
);

UserSchema.pre("save", function save(next) {
  const user = this as UserDocument;

  if (!user.isModified("password")) return next();
  bcrypt.genSalt(10, (err: Error, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) {
        return next(hashError);
      }
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword: string, cb: (err: any, isMatch: any) => void) {
  bcrypt.compare(candidatePassword, this.password, function (err: any, isMatch: any) {
    if (err) 
      return cb(err, isMatch);
    else
      cb(null, isMatch);
  });
};

// UserSchema.methods.comparePassword = (
//   candidatePassword: string,
//   cb
// ): comparePasswordFunction => {
//   const expectedPassword = this.password;
//   bcrypt.compare(
//     candidatePassword,
//     expectedPassword,
//     (err: mongoose.Error, isMatch: boolean) => {
//       cb(err, isMatch);
//     }
//   );
//   return;
// };

// Export the model
const UserModel = mongoose.model<UserDocument>("User", UserSchema);
export default UserModel;
