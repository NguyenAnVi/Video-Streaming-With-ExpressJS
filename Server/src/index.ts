import express from "express";
import cors from "cors";
import {Database} from "./providers/database";
import Locals from "./providers/locals";

import cookieParser from "cookie-parser";
import createError from "http-errors";
const app = express();
Database.init();
import router from "./routers/index";

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/", router());
app.use((req: express.Request, res: express.Response, next: any) => {
  return res.status(404).json({
    message:"Resource not found",
    status: false,
  });
});

app.listen(Locals.config().port, function () {
    console.log("Listening on port "+Locals.config().port+"!");
});