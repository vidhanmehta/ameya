import jwt from "jsonwebtoken";
import { createError } from "./errors.js";

export const verifyToken = (req,res,next)=>{
    console.log("verifying token")
    const token = req.cookies.access_token
    console.log(token)
    if(!token) return next(createError('401',"You're not Authenticated"))
    jwt.verify(token,process.env.JWT_SECRET,(err,info)=>{
        if(err) return next(createError('403','Token is not valid'))
        req.user = info
        next() // it will check whether every thing is okay or not and if it's not then it will throw an error else it will procced with next middleware
    })
}

export const verifyUser = (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            return next(createError('404',"You're not Authorized"))
        }
    })
}

export const verifySpecialist = (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.Specialist.id === req.params.id || req.Specialist.isAdmin){
            next()
        }else{
            return next(createError('404',"You're not Doctor or Operator"))
        }
    })
}