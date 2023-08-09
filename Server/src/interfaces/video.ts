import mongoose from "mongoose";

export type VideoDocument = mongoose.Document & {
  title: string;
  description: string;
  path: string;
  thumbnail: string;
  interactions:{
    likes:Number,
    dislikes:Number
  };
  views:Number
  status: Number;
  deleted_at: mongoose.Schema.Types.Date;
};
export default VideoDocument;
