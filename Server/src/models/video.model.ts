import mongoose from "../providers/database";
import VideoDocument from "../interfaces/video";

const VideoScheme = new mongoose.Schema<VideoDocument>(
  {
    title: String,
    description: String,
    path: String,
    thumbnail: String,
    owner:mongoose.Schema.Types.ObjectId,
    views:{
      type: mongoose.Schema.Types.Number,
      default:0
    },
    duration:{
      type: mongoose.Schema.Types.Number,
      default: 0
    },
    interactions:{
      likes:{
        type:mongoose.Schema.Types.Number,
        default: 0
      },
      dislikes:{
        type:mongoose.Schema.Types.Number,
        default: 0
      },
    },
    status: mongoose.Schema.Types.Number,
    deleted_at: mongoose.Schema.Types.Date
  },
  { timestamps: true, collection: "Video" }
);

const VideoModel = mongoose.model("Video", VideoScheme);
export default VideoModel;
