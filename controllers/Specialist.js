import {Specialist} from '../db/schema.js';
import { db } from '../db/setup.js';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { sendEmail } from '../utils/SendMail.js';

export const updateSpecialist =async(req,res,next)=>{
    try{
        const updatedSpecialist = await db.update(Specialist).set(req.body).where(eq(Specialist.id, req.params.id)) 
        res.status(200).json(updatedSpecialist)       
    }catch(err){
        next(err)
    }
}

export const deleteSpecialist = async(req,res,next)=>{
    try{
        const deletedSpecialist = await db.delete(Specialist).where(eq(Specialist.id, req.params.id))
        res.status(200).json('Deleted Specialist')
    }catch(err){
        next(err)
    }
}

export const getSpecialist = async (req,res,next)=>{
    try{
        // const gotSpecialist = await db.select().from(Specialist).leftJoin(FamilyMember, eq(req.params.id, FamilyMember.SpecialistId))
        const gotSpecialist = await db.query.Specialist.findFirst({
            where: (Specialist, {eq}) => eq(Specialist.id, req.params.id),
            with: {
                device: true,
                assessment: true,
                accounts: true
            }
        })

        if (!gotSpecialist) {
            return res.status(404).json({ message: "Specialist not found" });
        }

        res.status(200).json(gotSpecialist)
    }catch(err){
        console.error("Error in getSpecialist:", err);
        next(err)
    }
}

export const getAllSpecialist = async(req,res,next)=>{
    try{
        const getAllSpecialist = await db.select().from(Specialist)
        res.status(200).json(getAllSpecialist)
    }catch(err){
        next(err)
    }
}

export const updateSpecialistPassword = async(req,res,next)=>{

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    try{
        const updatedSpecialist = await db.update(Specialist).set({password: hash}).where(eq(Specialist.id, req.params.id))
        res.status(200).json(updatedSpecialist)
    }catch(err){
        next(err)
    }
}

export const sendPasswordEmail = async(req,res,next)=>{
    
    const password = Math.random().toString(36).slice(-8);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    try{
        const Specialist1 = await db.query.Specialist.findFirst({
            where: (Specialist, {eq}) => eq(Specialist.email, req.body.email),
        })
        if (!Specialist1) {
            return res.status(404).json({ message: "Specialist not found" });
        }else{
            const updatedSpecialist = await db.update(Specialist).set({password: hash}).where(eq(Specialist.id, Specialist1.id)).returning()
            console.log(updatedSpecialist)
            await sendEmail(Specialist1.email, "VITAL STEP - PASSWORD", Specialist1.name, password)
            res.status(200).json("Email Sent")
        }
    }catch(err){
        next(err)
    }
}