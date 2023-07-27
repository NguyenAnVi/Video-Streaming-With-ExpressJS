import express from "express";
import {streamVideo, getVideoPlayer} from "../controllers/videoStreaming.controller";

export default (router: express.Router) => {
  // app.get("/", function (req, res) {
  //   res.json({message:"homepage will dev later"});
  // });
  router.get("/video", streamVideo);

  router.get("/v", getVideoPlayer);
};
