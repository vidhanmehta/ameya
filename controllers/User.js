import {user} from '../db/schema.js';
import { db } from '../db/setup.js';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { sendEmail } from '../utils/SendMail.js';

export const updateUser =async(req,res,next)=>{
    try{
        const updatedUser = await db.update(user).set(req.body).where(eq(user.id, req.params.id)) 
        res.status(200).json(updatedUser)       
    }catch(err){
        next(err)
    }
}

export const deleteUser = async(req,res,next)=>{
    try{
        const deletedUser = await db.delete(user).where(eq(user.id, req.params.id))
        res.status(200).json('Deleted User')
    }catch(err){
        next(err)
    }
}

export const getUser = async (req,res,next)=>{
    try{
        // const gotUser = await db.select().from(User).leftJoin(FamilyMember, eq(req.params.id, FamilyMember.UserId))
        const gotUser = await db.query.user.findFirst({
            where: (User, {eq}) => eq(User.id, req.params.id),
            with: {
                device: true,
                assessment: true,
                accounts: {
                    with: {
                        acc_connect: true
                    }
                },
            }
        })

        if (!gotUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(gotUser)
    }catch(err){
        console.error("Error in getUser:", err);
        next(err)
    }
}

export const getAllUser = async(req,res,next)=>{
    try{
        const getAllUser = await db.select().from(user)
        res.status(200).json(getAllUser)
    }catch(err){
        next(err)
    }
}

export const updateUserPassword = async(req,res,next)=>{

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    try{
        const updatedUser = await db.update(user).set({password: hash}).where(eq(user.id, req.params.id))
        res.status(200).json(updatedUser)
    }catch(err){
        next(err)
    }
}

export const sendPasswordEmail = async(req,res,next)=>{
    
    const password = Math.random().toString(36).slice(-8);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    try{
        const user1 = await db.query.user.findFirst({
            where: (User, {eq}) => eq(User.email, req.body.email),
        })
        if (!user1) {
            return res.status(404).json({ message: "User not found" });
        }else{
            const updatedUser = await db.update(user).set({password: hash}).where(eq(user.id, user1.id)).returning()
            console.log(updatedUser)
            await sendEmail(user1.email, "VITAL STEP - PASSWORD", user1.name, password)
            res.status(200).json("Email Sent")
        }
    }catch(err){
        next(err)
    }
}