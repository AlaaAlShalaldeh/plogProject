import userRouter from "./modules/user/user.router.js"
import authRouter from "./modules/auth/auth.router.js"
import blogRouter from "./modules/blog/blog.router.js"
import connectedDB from "../DB/connection.js"
import cors from 'cors';
export const initApp =(app,express)=>{
    app.use(cors());
    connectedDB();
    app.use(express.json());
    app.use("/users", userRouter); 
    app.use("/auth", authRouter); 
    app.use("/blogs", blogRouter); 
    app.use("*", (req,res)=>{
        return res.status(404).json({message:"page not found"});
    }); 
}