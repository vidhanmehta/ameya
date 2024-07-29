import jwt from "jsonwebtoken";
import { createError } from "./errors.js";

export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token
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

export const verifyAdmin = (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.role == "Admin"){
            next()
        }else{
            return next(createError('404',"You're not Admin"))
        }
    })
}

export const verifyOperator = (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.role == "Operator"){
            next()
        }else{
            return next(createError('404',"You're not Operator"))
        }
    })
}

export const verifyDoctor = (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.role == "Doctor"){
            next()
        }else{
            return next(createError('404',"You're not Doctor"))
        }
    })
}

export const verifyDoctorOperator = (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.role == "Doctor" || "Operator"){
            next()
        }else{
            return next(createError('404',"You're not Doctor or Operator"))
        }
    })
}