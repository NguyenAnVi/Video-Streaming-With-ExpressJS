import { Router } from "express";
import {streamVideo, getVideoProperties, getVideoPlayer} from "../controllers/videoStreaming.controller";

export default (router: Router) => {
  router.get("/getvideoproperties/:videoid", getVideoProperties);
  router.get("/video", streamVideo);
  router.get("/v", getVideoPlayer);
};
