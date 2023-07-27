import * as dotenv from "dotenv";
import * as path from "path";

class Locals {
  public static config(): any {
    dotenv.config({ path: path.join(__dirname, "../../.env") });
    const port = process.env.PORT;
    const mongoUri = process.env.MONGO_URI;
    return {
      port,
      mongoUri,
    };
  }
}
export default Locals;
