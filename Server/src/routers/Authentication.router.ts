import express from "express";
import { signin, signup, updateProfile, updateAvatar } from "../controllers/authentication.controller";
import { loginRequired } from "../middlewares/loginRequired.middleware";

export default (router: express.Router) => {
  router.post("/signin", signin);
  router.post("/signup", signup);
  router.post("/updateprofile", loginRequired, updateProfile);
  router.post("/updateavatar", loginRequired, updateAvatar);
};
