import { Router } from "express";
import { getAccountInfo } from "../controllers/account.controller";

export default (router: Router) => {
  router.get("/account/:id",getAccountInfo);
};
