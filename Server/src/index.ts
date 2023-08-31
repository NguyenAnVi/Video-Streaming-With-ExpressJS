import cors from "cors";
import path from 'path';
import express from "express";
import bodyParser from "body-parser";
import router from "./routers/index";
import Locals from "./providers/locals";
import {Database} from "./providers/database";

import {fileURLToPath} from 'url';
import cookieParser from "cookie-parser";

const app = express();
const __dirname = fileURLToPath(import.meta.url);

const publicPaths = [
  './public',
  './public/storage',
  './public/storage/avatar',
  './public/storage/videos'
]
publicPaths.forEach((path)=>{
  Locals.config().createFolderIfNotExist(path);
});
Database.init();

app.use(cors());
app.use(bodyParser.json({limit:'1gb'}));
app.use (express.static ('public'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
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