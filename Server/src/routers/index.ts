import express from "express";
import VideoStreamingRouter from "../routers/VideoStreaming.router"
import HomePageRouter from "./HomePage.router";
import AuthenticationRouter from "./Authentication.router";
const router = express.Router();

export default (): express.Router => {
  VideoStreamingRouter(router);
  HomePageRouter(router);
  AuthenticationRouter(router);
  return router;
};