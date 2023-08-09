import { Router } from "express";
import {getVideos} from "../controllers/homePage.controller";

export default (router: Router) => {
  router.get("/getvideos", getVideos);
};
