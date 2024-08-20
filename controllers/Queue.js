import {queue} from '../db/schema.js';
import { db } from '../db/setup.js';
import { eq } from 'drizzle-orm';

export const updateQueue =async(req,res,next)=>{
    try{
        const updatedQueue = await db.update(queue).set(req.body).where(eq(queue.id, req.params.id)) 
        res.status(200).json(updatedQueue)       
    }catch(err){
        next(err)
    }
}

export const createQueue = async(req,res,next)=>{
    try{
        const createdQueue = await db.insert(queue).values(req.body).returning()
        res.status(200).json(createdQueue)
    }catch(err){
        next(err)
    }
}

export const deleteQueue = async(req,res,next)=>{
    try{
        const deletedQueue = await db.delete(queue).where(eq(queue.deviceId, req.params.id))
        res.status(200).json('Deleted Queue')
    }catch(err){
        next(err)
    }
}

export const getQueue = async (req,res,next)=>{
    try{
        // const gotQueue = await db.select().from(Queue).leftJoin(FamilyMember, eq(req.params.id, FamilyMember.QueueId))
        const gotQueue = await db.query.queue.findFirst({
            where: (Queue, {eq}) => eq(Queue.id, req.params.id),
        })

        if (!gotQueue) {
            return res.status(404).json({ message: "Queue not found" });
        }

        res.status(200).json(gotQueue)
    }catch(err){
        console.error("Error in getQueue:", err);
        next(err)
    }
}

export const getUserQueue = async(req,res,next)=>{
    try{
        const getAllQueue = await db.select().from(queue).where(eq(queue.userId, req.params.id))
        res.status(200).json(getAllQueue)
    }catch(err){
        next(err)
    }
}

export const getDeviceQueue = async(req,res,next)=>{
    try{
        const getAllQueue = await db.select().from(queue).where(eq(queue.deviceId, req.params.id))
        res.status(200).json(getAllQueue)
    }catch(err){
        next(err)
    }
}

export const getAssessmentQueue = async(req,res,next)=>{
    try{
        const getAllQueue = await db.select().from(queue).where(eq(queue.assessmentId, req.params.id))
        res.status(200).json(getAllQueue)
    }catch(err){
        next(err)
    }
}