import { Router } from "express";
import {streamVideo, getVideoPlayer} from "../controllers/videoStreaming.controller";

export default (router: Router) => {
  router.get("/video", streamVideo);
  router.get("/v", getVideoPlayer);
};
