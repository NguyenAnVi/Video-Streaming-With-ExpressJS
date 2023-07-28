import express from "express";
import { signin, signup, test } from "../controllers/authentication.controller";
import { loginRequired } from "../middlewares/loginRequired.middleware";

export default (router: express.Router) => {
  router.post("/signin", signin);
  router.post("/signup", signup);
  router.get("/testtoken", loginRequired, test);
};
