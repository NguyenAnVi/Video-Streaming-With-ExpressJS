import { existsSync, mkdirSync, PathLike } from "fs";
import * as dotenv from "dotenv";
import * as path from "path";

class Locals {
  public static config(): any {
    dotenv.config({ path: path.join(__dirname, "../../.env") });
    const hostname = process.env.HOSTNAME;
    const port = process.env.PORT;
    const mongoUri = process.env.MONGO_URI;
    const jwtSecret = process.env.JWT_SECRET;
    const createFolderIfNotExist = (dir:PathLike)=>{
      if (!existsSync(dir)) {
        mkdirSync(dir);
      }
    }
    return {
      createFolderIfNotExist,
      port,
      mongoUri,
      jwtSecret,
      hostname
    };
  }
}
export default Locals;
