import {accountAccess} from '../db/schema.js';
import { db } from '../db/setup.js';
import { eq } from 'drizzle-orm';

export const updateAccountAccess =async(req,res,next)=>{
    try{
        const updatedAccountAccess = await db.update(accountAccess).set(req.body).where(eq(accountAccess.id, req.params.id)) 
        res.status(200).json(updatedAccountAccess)       
    }catch(err){
        next(err)
    }
}

export const createAccountAccess = async(req,res,next)=>{
    try{
        const createdAccountAccess = await db.insert(accountAccess).values(req.body).returning()
        res.status(200).json(createdAccountAccess)
    }catch(err){
        next(err)
    }
}

export const deleteAccountAccess = async(req,res,next)=>{
    try{
        const deletedAccountAccess = await db.delete(accountAccess).where(eq(accountAccess.id, req.params.id))
        res.status(200).json('Deleted AccountAccess')
    }catch(err){
        next(err)
    }
}

export const getAccountAccess = async (req,res,next)=>{
    try{
        // const gotAccountAccess = await db.select().from(AccountAccess).leftJoin(FamilyMember, eq(req.params.id, FamilyMember.AccountAccessId))
        const gotAccountAccess = await db.query.accountAccess.findFirst({
            where: (AccountAccess, {eq}) => eq(AccountAccess.id, req.params.id),
            with: {
                user: true
            }
        })

        if (!gotAccountAccess) {
            return res.status(404).json({ message: "AccountAccess not found" });
        }

        res.status(200).json(gotAccountAccess)
    }catch(err){
        console.error("Error in getAccountAccess:", err);
        next(err)
    }
}

export const getUserAccountAccess = async(req,res,next)=>{
    try{
        const getAllAccountAccess = await db.select().from(accountAccess).where(eq(accountAccess.userId, req.params.id))
        res.status(200).json(getAllAccountAccess)
    }catch(err){
        next(err)
    }
}
