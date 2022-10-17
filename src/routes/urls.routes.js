import express from "express";
import { getShortUrl, getUrl, postUrl } from "../controllers/urls.controller.js";
import { validateNewUrl } from "../middlewares/urls.middleware.js";

const urlRouter = express.Router();

urlRouter.post("/urls/shorten", validateNewUrl, postUrl) ;
urlRouter.get("/urls/:idUrl", getUrl) ;
urlRouter.get("/urls/open/:shortUrl", getShortUrl) ;



urlRouter.get ('/statusurl', (req, res)=>{
    res.send('Rota url funcionando!')
})


export default urlRouter;