import fs from "fs";
import path from 'path';
import VideoModel from "../models/video.model";
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __videoDir = path.dirname(__filename+"../videos/");

export const streamVideo = function (req, res) {
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }
  
  // provide the path and the size of the video
  const videoPath = __dirname+"/videos/I_Secretly_Love_You_Piano_Cello-144p.mp4";
  const videoSize = fs.statSync(videoPath).size;
  
  // Parsing the range
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
  const contentLength = end - start + 1;
  
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  }
  
  res.writeHead(206, headers);
  const videoStream = fs.createReadStream(videoPath, { start, end });
  videoStream.pipe(res);
}
export const getVideoProperties = function (req, res) {
  VideoModel.findById(req.params.videoid)
    .then((videoResult)=>{
      res.status(200).json({
        video:videoResult
      })
    })
    .catch(err=>res.status(404).json({
      message:"Video "+req.params.videoid+" not found.",
      video:null
    }));

}

export const getVideoPlayer = function (req, res) {
  console.log(__filename+" - "+__dirname);
  res.sendFile(__dirname + "/html/videoplayer.html");
}