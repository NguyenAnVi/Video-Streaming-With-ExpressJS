import { Router } from "express";
import { getVideoProperties, getVideo, getThumbnail, getRecommendedVideos } from "../controllers/videoStreaming.controller";

export default (router: Router) => {
  router.post("/getrecommendedvideos", getRecommendedVideos);
  router.get("/getvideoproperties/:videoid", getVideoProperties);
  router.get("/getthumbnail/:imagename", getThumbnail);
  router.get("/getvideo/:videoname", getVideo);
};
