import {reminder} from '../db/schema.js';
import { db } from '../db/setup.js';
import { eq } from 'drizzle-orm';

export const updateReminder =async(req,res,next)=>{
    try{
        const updatedReminder = await db.update(reminder).set(req.body).where(eq(reminder.id, req.params.id)) 
        res.status(200).json(updatedReminder)       
    }catch(err){
        next(err)
    }
}

export const createReminder = async(req,res,next)=>{
    try{
        const createdReminder = await db.insert(reminder).values(req.body).returning()
        res.status(200).json(createdReminder)
    }catch(err){
        next(err)
    }
}

export const deleteReminder = async(req,res,next)=>{
    try{
        const deletedReminder = await db.delete(reminder).where(eq(reminder.id, req.params.id))
        res.status(200).json('Deleted Reminder')
    }catch(err){
        next(err)
    }
}

export const getReminder = async (req,res,next)=>{
    try{
        // const gotReminder = await db.select().from(Reminder).leftJoin(FamilyMember, eq(req.params.id, FamilyMember.ReminderId))
        const gotReminder = await db.query.reminder.findFirst({
            where: (Reminder, {eq}) => eq(Reminder.id, req.params.id),
            with: {
                assessment: true
            }
        })

        if (!gotReminder) {
            return res.status(404).json({ message: "Reminder not found" });
        }

        res.status(200).json(gotReminder)
    }catch(err){
        console.error("Error in getReminder:", err);
        next(err)
    }
}

export const getUserReminder = async(req,res,next)=>{
    try{
        const getAllReminder = await db.select().from(reminder).where(eq(reminder.userId, req.params.id))
        res.status(200).json(getAllReminder)
    }catch(err){
        next(err)
    }
}

export const getAssesmentReminder = async(req,res,next)=>{
    try{
        const getAllReminder = await db.select().from(reminder).where(eq(reminder.assesmentId, req.params.id))
        res.status(200).json(getAllReminder)
    }catch(err){
        next(err)
    }
}