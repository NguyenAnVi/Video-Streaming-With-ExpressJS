import express from "express";
const app = express();
import path from 'path';
import {fileURLToPath} from 'url';
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/html/videoplayer.html");
});

 // more code will go in here just befor the listening function

app.get("/video", function (req, res) {
  const range = req.headers.range;
  if (!range) {
      res.status(400).send("Requires Range header");
  }

  // provide the path and the size of the video
  const videoPath = __dirname+"/videos/violet.mp4";
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
  });

app.listen(8000, function () {
    console.log("Listening on port 8000!");
});