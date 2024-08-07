import { Router } from "express";
import blogModel from "../../../DB/model/blog.model.js";
import jwt from "jsonwebtoken";
import userModel from "../../../DB/model/user.model.js";
import commentModel from "../../../DB/model/comment.model.js";
const app = Router();
app.post('/:userid/:blogid',async(req,res)=>{
    try{
        const {userid,blogid}=req.params;
        const {description}=req.body;
        const user = await userModel.findOne({where: {id: userid}});
        const blog = await blogModel.findOne({where: {id: blogid}});
        if(!user||!blog){
            return res.status(404).json({message:"user or blog not found"});
        }
        const comment = await commentModel.create({description:description, UserId:userid,BlogId:blogid});
        return res.status(201).json({message:"success",data:comment});
    }
    catch(error){
        
        return res.status(500).json({message:"server error",error});
    }
})
app.get('/:blogid',async(req, res)=>{
    try{
        const {blogid}=req.params;
        const comments = await commentModel.findAll({where: {BlogId: blogid}});
        return res.status(200).json({message:"success",data:comments});
    }
    catch(error){
        
        return res.status(500).json({message:"server error",error});
    }
});
export default app;