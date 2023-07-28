import { Router } from "express";
import {getAllVideos} from "../controllers/homePage.controller";

export default (router: Router) => {
  router.get("/homepage", getAllVideos);
};
