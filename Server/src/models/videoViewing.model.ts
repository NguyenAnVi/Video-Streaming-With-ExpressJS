import mongoose from "../providers/database";
import VideoViewingDocument from "../interfaces/videoViewing";

const VideoViewingSchema = new mongoose.Schema<VideoViewingDocument>(
  {
    videoId:mongoose.Schema.Types.ObjectId,
    createdAt: { type: Date, expires: 60*60*24*1, default: Date.now } // expires means it will disappear after 24hours
  },
  { timestamps: true, collection: "VideoViewing" }
  );

const VideoViewingModel = mongoose.model("VideoViewing", VideoViewingSchema);
export default VideoViewingModel;
