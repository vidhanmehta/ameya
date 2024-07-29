import {remarks} from '../db/schema.js';
import { db } from '../db/setup.js';
import { eq } from 'drizzle-orm';

export const updateRemarks =async(req,res,next)=>{
    try{
        const updatedRemarks = await db.update(remarks).set(req.body).where(eq(remarks.id, req.params.id)) 
        res.status(200).json(updatedRemarks)       
    }catch(err){
        next(err)
    }
}

export const createRemarks = async(req,res,next)=>{
    try{
        const createdRemarks = await db.insert(remarks).values(req.body).returning()
        res.status(200).json(createdRemarks)
    }catch(err){
        next(err)
    }
}

export const deleteRemarks = async(req,res,next)=>{
    try{
        const deletedRemarks = await db.delete(remarks).where(eq(remarks.id, req.params.id))
        res.status(200).json('Deleted Remarks')
    }catch(err){
        next(err)
    }
}

export const getRemarks = async (req,res,next)=>{
    try{
        // const gotRemarks = await db.select().from(Remarks).leftJoin(FamilyMember, eq(req.params.id, FamilyMember.RemarksId))
        const gotRemarks = await db.query.remarks.findFirst({
            where: (Remarks, {eq}) => eq(Remarks.id, req.params.id),
            with: {
                assessment: true
            }
        })

        if (!gotRemarks) {
            return res.status(404).json({ message: "Remarks not found" });
        }

        res.status(200).json(gotRemarks)
    }catch(err){
        console.error("Error in getRemarks:", err);
        next(err)
    }
}

export const getAssessmentRemarks = async(req,res,next)=>{
    try{
        const getAllRemarks = await db.select().from(remarks).where(eq(remarks.assessmentId, req.params.id))
        res.status(200).json(getAllRemarks)
    }catch(err){
        next(err)
    }
}

export const getAssignerRemarks = async(req,res,next)=>{
    try{
        const getAllRemarks = await db.select().from(remarks).where(eq(remarks.AssignerId, req.params.id))
        res.status(200).json(getAllRemarks)
    }catch(err){
        next(err)
    }
}