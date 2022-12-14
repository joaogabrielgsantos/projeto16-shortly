import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import authRouter from './routes/auth.routes.js';
import urlRouter from './routes/urls.routes.js';
import userRouter from './routes/users.routes.js';
authRouter

dotenv.config();
const app = express()
app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use(urlRouter);
app.use(userRouter);




app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));