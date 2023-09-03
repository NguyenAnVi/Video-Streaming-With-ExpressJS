import mongoose from "mongoose";

export type VideoViewingDocument = mongoose.Document & {
  videoId: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
};
export default VideoViewingDocument;
