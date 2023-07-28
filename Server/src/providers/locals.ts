import * as dotenv from "dotenv";
import * as path from "path";

class Locals {
  public static config(): any {
    dotenv.config({ path: path.join(__dirname, "../../.env") });
    const port = process.env.PORT;
    const mongoUri = process.env.MONGO_URI;
    const jwtSecret = process.env.JWT_SECRET;
    return {
      port,
      mongoUri,
      jwtSecret
    };
  }
}
export default Locals;
