import {SpecialistQueue} from '../db/schema.js';
import { db } from '../db/setup.js';
import { eq } from 'drizzle-orm';

export const updateSpecialistQueue =async(req,res,next)=>{
    try{
        const updatedSpecialistQueue = await db.update(SpecialistQueue).set(req.body).where(eq(SpecialistQueue.id, req.params.id)) 
        res.status(200).json(updatedSpecialistQueue)       
    }catch(err){
        next(err)
    }
}

export const createSpecialistQueue = async(req,res,next)=>{
    try{
        const createdSpecialistQueue = await db.insert(SpecialistQueue).values(req.body).returning()
        res.status(200).json(createdSpecialistQueue)
    }catch(err){
        next(err)
    }
}

export const deleteSpecialistQueue = async(req,res,next)=>{
    try{
        const deletedSpecialistQueue = await db.delete(SpecialistQueue).where(eq(SpecialistQueue.deviceCode, req.params.id))
        res.status(200).json('Deleted Queue')
    }catch(err){
        next(err)
    }
}

export const getSpecialistQueue = async (req,res,next)=>{
    try{
        // const gotQueue = await db.select().from(Queue).leftJoin(FamilyMember, eq(req.params.id, FamilyMember.QueueId))
        const gotSpecialistQueue = await db.query.SpecialistQueue.findFirst({
            where: (Queue, {eq}) => eq(Queue.deviceCode, req.params.id),
        })

        if (!gotSpecialistQueue) {
            return res.status(404).json({ message: "Queue not found" });
        }

        res.status(200).json(gotSpecialistQueue)
    }catch(err){
        console.error("Error in getQueue:", err);
        next(err)
    }
}

export const getAllSpecialistQueue = async (req,res,next)=>{
    try{
        // const gotQueue = await db.select().from(Queue).leftJoin(FamilyMember, eq(req.params.id, FamilyMember.QueueId))
        const gotSpecialistQueue = await db.select().from(SpecialistQueue)

        if (!gotSpecialistQueue) {
            return res.status(404).json({ message: "Queue not found" });
        }

        res.status(200).json(gotSpecialistQueue)
    }catch(err){
        console.error("Error in getQueue:", err);
        next(err)
    }
}

