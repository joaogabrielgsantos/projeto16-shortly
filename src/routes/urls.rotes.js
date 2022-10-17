import express from "express";

const urlRouter = express.Router();

urlRouter.post("/urls/shorten") ;
urlRouter.get ('/statusurl', (req, res)=>{
    res.send('Rota url funcionando!')
})


export default urlRouter;