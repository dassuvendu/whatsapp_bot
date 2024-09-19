import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import webhookRoutes from "./routes/webhook";
import body_parser from "body-parser";

const app = express();

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));

//to handle any frontend calls 
app.use("/webhook",webhookRoutes);

app.use((req,res,next)=>{
  next(Error("End point not found"));
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error:unknown,req:Request,res:Response,next:NextFunction)=>{
  console.error("# error start #");
  console.error(error);
  console.error("# error end #");
  let errorMessage="An unknown error occured";
  if(error instanceof Error){
    errorMessage=error.message;
    res.status(500).json({error:errorMessage});
  }
})

export default app;