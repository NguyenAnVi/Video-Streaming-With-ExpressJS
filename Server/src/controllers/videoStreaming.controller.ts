import fs, { writeFile } from "fs";
import path from 'path';
import express from "express";
import {fileURLToPath} from 'url';
import VideoModel from "../models/video.model";
import Locals from "../providers/locals";
const __filename = fileURLToPath(import.meta.url);
const __videoDir = path.dirname(__filename+"../videos/");

// export const streamVideo = function (req, res) {
//   const range = req.headers.range;
//   if (!range) {
//     res.status(400).send("Requires Range header");
//   }
  
//   // provide the path and the size of the video
//   const videoPath = __dirname+"/videos/I_Secretly_Love_You_Piano_Cello-144p.mp4";
//   const videoSize = fs.statSync(videoPath).size;
  
//   // Parsing the range
//   const CHUNK_SIZE = 10 ** 6; // 1MB
//   const start = Number(range.replace(/\D/g, ""));
//   const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
//   const contentLength = end - start + 1;
  
//   const headers = {
//     "Content-Range": `bytes ${start}-${end}/${videoSize}`,
//     "Accept-Ranges": "bytes",
//     "Content-Length": contentLength,
//     "Content-Type": "video/mp4",
//   }
  
//   res.writeHead(206, headers);
//   const videoStream = fs.createReadStream(videoPath, { start, end });
//   videoStream.pipe(res);
// }
export const getVideo = function (req, res) {
  const {range} = req.headers;
  const {videoname} = req.params;
  if (!range) {
    res.status(400).send("Requires Range header");
  }
  
  // provide the path
  const videoPath = __dirname+"/videos/"+videoname;

  if ( fs.existsSync(videoPath) ) {
    const videoSize = fs.statSync(videoPath).size;
  
    // Parsing the range
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    
    // const headers = {
    //   "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    //   "Accept-Ranges": "bytes",
    //   "Content-Length": contentLength,
    //   "Content-Type": "video/mp4",
    // }
    // res.writeHead(206, headers);
    // const videoStream = fs.createReadStream(videoPath, { start, end });
    // videoStream.pipe(res);

    const headers = {
      "Content-Type": "video/mp4",
    }
    res.writeHead(200, headers);
    const videoStream = fs.createReadStream(videoPath);
    videoStream.pipe(res);
  } else {
    return res.status(404).json({message:"Video not found"});
  }
  
 
}
export const getThumbnail = function (req, res) {
  // provide the path
  const thumbnailPath = __dirname+"/videos/"+req.params.imagename;

  if ( fs.existsSync(thumbnailPath) ) {
  
    const headers = {
      "Content-Type": "image/jpg",
    }
    res.writeHead(200, headers);
    const imagestream = fs.createReadStream(thumbnailPath);
    imagestream.pipe(res);
  } else {
    return res.status(404).json({message:"Image not found"});
  }
  
 
}
export const getRecommendedVideos = async function (req, res) {
  const currentVideoForSuggesting = req.body.videoid as string;
  await VideoModel
    .find({})
    .then((videoResults)=>{
      if (videoResults) {
        return res.status(200).json({
          default:videoResults
        })
      } else {
        return res.status(404).json({
          message:"Video not found.",
          video:null
        })
      }
    })
    .catch((err)=>{
      return res.status(500).json({
        message:err.message,
        data:null
      })
    });

}
export const getVideoProperties = async function (req, res) {
  const id = req.params.videoid as string;
  await VideoModel
    .findById(id)
    .then((videoResult)=>{
      if (videoResult) {
        return res.status(200).json({
          video:videoResult
        })
      } else {
        return res.status(404).json({
          message:"Video not found.",
          video:null
        })
      }
    })
    .catch((err)=>{
      return res.status(500).json({
        message:err.message,
        data:id
      })
    });

}
export const uploadVideo = async function (req:any, res:any){
  const data = req.body.data;
  setTimeout(async () => {
    const hostname = Locals.config().hostname;
    const port = Locals.config().port;
    const timestamp = Date.now();
    const filepath = './public/storage/videos/'+timestamp+"/";
    const publicpath = hostname + ':' + port + '/storage/videos/'+timestamp+"/";

    Locals.config().createFolderIfNotExist(filepath);

    var videoData = data.video.replace(/^data:video\/mp4;base64,/, "");
    let filename = 'video.mp4';
    const videoPublicUrl = publicpath+filename;
    writeFile(filepath+filename, videoData, {
      encoding:'base64',
      flag:'w+'
    }, function(werr) {
      if(werr){
        console.log(werr);
        return res.status(500).json({
          message:werr.message,
        });
      }
    });

    var imageData = data.thumbnail.replace(/^data:image\/png;base64,/, "");
    filename = 'thumbnail.png';
    const thumbnailPublicUrl = publicpath+filename;
    writeFile(filepath+filename, imageData, {
      encoding:'base64',
      flag:'w+'
    }, function(werr) {
      if(werr){
        console.log(werr);
        return res.status(500).json({
          message:werr.message,
        });
      }
    });

    const newvideo = await new VideoModel({
      title: data.videoTitle,
      description: data.videoDescription,
      path: videoPublicUrl,
      thumbnail: thumbnailPublicUrl,
      duration:data.info.duration,
      status: 1
    }).save().then(
      videoResult => {
        return res.status(200).json({
          message:"Uploaded!"
        });
      }
    )

    

  }, 1000);
}