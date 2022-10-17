import express from "express";
import { getUrl, postUrl } from "../controllers/urls.controller.js";
import { validateNewUrl } from "../middlewares/urls.middleware.js";

const urlRouter = express.Router();

urlRouter.post("/urls/shorten", validateNewUrl, postUrl) ;
urlRouter.get("/urls/:id", getUrl) ;



urlRouter.get ('/statusurl', (req, res)=>{
    res.send('Rota url funcionando!')
})


export default urlRouter;