import { Router } from "express";
const app = Router();
app.get('/',(req,res)=>{
 return  res.status(200).json({message:"all blog"});
});
export default app;