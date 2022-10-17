import express from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";
import {validateLogin, validateNewUser} from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/signup", validateNewUser, signUp) ;
authRouter.post("/signin", validateLogin, signIn) ;
authRouter.get ('/status', (req, res)=>{
    res.send('Tudo funcionando!')
})


export default authRouter;