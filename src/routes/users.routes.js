import express from "express";
import { getRanking, getUserUrls } from "../controllers/users.controller.js";


const userRouter = express.Router();


userRouter.get("/users/me", getUserUrls) ;
userRouter.get("/ranking", getRanking) ;










export default userRouter;