import express from "express";

import HomePageRouter from "./HomePage.router";
import AccountRouter from "./account.router";
import VideoStreamingRouter from "./VideoStreaming.router";
import AuthenticationRouter from "./Authentication.router";
const router = express.Router();

export default (): express.Router => {
  AccountRouter(router);
  VideoStreamingRouter(router);
  HomePageRouter(router);
  AuthenticationRouter(router);
  return router;
};