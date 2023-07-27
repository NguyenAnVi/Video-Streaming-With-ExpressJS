import express from "express";
import videoStreamingRouter from "./videoStreaming.router"
const router = express.Router();

export default (): express.Router => {
  videoStreamingRouter(router);
  return router;
};