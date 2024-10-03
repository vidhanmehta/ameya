import {accountAccess, user} from '../db/schema.js';
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
        const IsUser = await db.select().from(user).where(eq(user.email, req.body.email))
        if(IsUser.length == 0){
            res.status(404).json('User not found')
        }else if(IsUser[0].accessCode !== req.body.accessCode){
            res.status(500).json('Invalid Access Code')   
        }else{
            const createdAccountAccess = await db.insert(accountAccess).values({
                "userId":IsUser[0].id,
                "specialistId":req.body.specialistId
            }).returning()
            res.status(200).json(createdAccountAccess)
        }
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
        const getAllAccountAccess = await  db.query.accountAccess.findMany({
            where: (accountAccess, {eq}) => eq(accountAccess.userId, req.params.id),
            with: {
                user: true
            }
        })
        // const getAllAccountAccess = await db.select().from(accountAccess).where(eq(accountAccess.userId, req.params.id))
        res.status(200).json(getAllAccountAccess)
    }catch(err){
        next(err)
    }
}

export const getSpecialistAccountAccess = async(req,res,next)=>{
    try{
        const getAllAccountAccess = await db.query.accountAccess.findMany({
            where: (accountAccess, {eq}) => eq(accountAccess.specialistId, req.params.id),
            with: {
                user: true
            }
        })
        res.status(200).json(getAllAccountAccess)
    }catch(err){
        next(err)
    }
}