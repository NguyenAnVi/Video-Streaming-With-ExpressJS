import mongoose from "mongoose";

export type VideoDocument = mongoose.Document & {
  title: string;
  description: string;
  path: string;
  thumbnail: string;
  demo: string;
  status: string;
  deleted_at: mongoose.Schema.Types.Date;
};
export default VideoDocument;
