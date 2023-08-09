import { Router } from "express";
import { getVideoProperties, getVideo, getThumbnail} from "../controllers/videoStreaming.controller";

export default (router: Router) => {
  router.get("/getvideoproperties/:videoid", getVideoProperties);
  router.get("/getthumbnail/:imagename", getThumbnail);
  router.get("/getvideo/:videoname", getVideo);
};
