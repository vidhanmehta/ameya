import {user} from '../db/schema.js';
import { db } from '../db/setup.js';
import { eq } from 'drizzle-orm';

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