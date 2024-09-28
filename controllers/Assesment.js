import {assessment} from '../db/schema.js';
import { db } from '../db/setup.js';
import { eq } from 'drizzle-orm';

export const updateAssesment =async(req,res,next)=>{
    try{
        const updatedAssesment = await db.update(assessment).set(req.body).where(eq(assessment.id, req.params.id)) 
        res.status(200).json(updatedAssesment)       
    }catch(err){
        next(err)
    }
}

export const createAssesment = async(req,res,next)=>{
    try{
        const createdAssesment = await db.insert(assessment).values(req.body).returning()
        res.status(200).json(createdAssesment)
    }catch(err){
        next(err)
    }
}

export const deleteAssesment = async(req,res,next)=>{
    try{
        const deletedAssesment = await db.delete(assessment).where(eq(assessment.id, req.params.id))
        res.status(200).json('Deleted Assesment')
    }catch(err){
        next(err)
    }
}

export const getAssesment = async (req,res,next)=>{
    try{
        // const gotAssesment = await db.select().from(Assesment).leftJoin(FamilyMember, eq(req.params.id, FamilyMember.AssesmentId))
        const gotAssesment = await db.query.assessment.findFirst({
            where: (Assesment, {eq}) => eq(Assesment.id, req.params.id),
            with: {
y
                remarks: true
            }
        })

        if (!gotAssesment) {
            return res.status(404).json({ message: "Assesment not found" });
        }

        res.status(200).json(gotAssesment)
    }catch(err){
        console.error("Error in getAssesment:", err);
        next(err)
    }
}

export const getUserAssesment = async(req,res,next)=>{
    try{
        const getAllAssesment = await db.select().from(assessment).where(eq(assessment.userId, req.params.id))
        res.status(200).json(getAllAssesment)
    }catch(err){
        next(err)
    }
}
