import mongoose from "../providers/database";
import VideoDocument from "../interfaces/video";

const VideoScheme = new mongoose.Schema<VideoDocument>(
  {
    title: String,
    description: String,
    path: String,
    thumbnail: String,
    demo: String,
    status: String,
    deleted_at: mongoose.Schema.Types.Date
  },
  { timestamps: true, collection: "Video" }
);

const VideoModel = mongoose.model("Video", VideoScheme);
export default VideoModel;
