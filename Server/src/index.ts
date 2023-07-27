import express from "express";
import cors from "cors";

import cookieParser from "cookie-parser";
import createError from "http-errors";
const app = express();
import router from "./routers/index";

app.use(cors());
app.use(cookieParser());
app.use("/", router());
app.use((req: express.Request, res: express.Response, next: any) => {
  return next(createError(404));
});

app.listen(8000, function () {
    console.log("Listening on port 8000!");
});