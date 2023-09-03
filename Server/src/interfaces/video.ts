import mongoose from "mongoose";

export type VideoDocument = mongoose.Document & {
  owner:mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  path: string;
  thumbnail: string;
  interactions:{
    likes:number,
    dislikes:number
  };
  duration:number;
  views:number;
  status: number;
  deleted_at: mongoose.Schema.Types.Date;
};
export default VideoDocument;
