import { Router } from "express";
import { getVideoProperties, getVideo, getThumbnail, getRecommendedVideos, uploadVideo, countView } from "../controllers/videoStreaming.controller";
import { loginRequired } from "../middlewares/loginRequired.middleware";

export default (router: Router) => {
  router.post("/getrecommendedvideos", getRecommendedVideos);
  router.get("/getvideoproperties/:videoid", getVideoProperties);
  router.get("/countview/:videoid", countView);
  router.get("/getthumbnail/:imagename", getThumbnail);
  router.get("/getvideo/:videoname", getVideo);
  
  router.post("/uploadvideo", loginRequired, uploadVideo);
};
