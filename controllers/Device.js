import {device} from '../db/schema.js';
import { DeviceQueue } from '../db/schema.js';
import { db } from '../db/setup.js';
import { eq } from 'drizzle-orm';

export const updateDevice =async(req,res,next)=>{
    try{
        const updatedDevice = await db.update(device).set(req.body).where(eq(device.id, req.params.id)) 
        res.status(200).json(updatedDevice)       
    }catch(err){
        next(err)
    }
}

export const createDevice = async(req,res,next)=>{
    console.log("creating device", req.body)
    try{
        const createdDevice = await db.insert(device).values(req.body).returning()
        const deletedQueue = await db.delete(DeviceQueue).where(eq(DeviceQueue.deviceCode, req.body.deviceCode))
        res.status(200).json(createdDevice)
    }catch(err){
        next(err)
    }
}

export const deleteDevice = async(req,res,next)=>{
    try{
        const deletedDevice = await db.delete(device).where(eq(device.id, req.params.id))
        res.status(200).json('Deleted Device')
    }catch(err){
        next(err)
    }
}

export const getDevice = async (req,res,next)=>{
    try{
        // const gotDevice = await db.select().from(Device).leftJoin(FamilyMember, eq(req.params.id, FamilyMember.DeviceId))
        const gotDevice = await db.query.device.findFirst({
            where: (Device, {eq}) => eq(Device.id, req.params.id),
            with: {
                user: true
            }
        })

        if (!gotDevice) {
            return res.status(404).json({ message: "Device not found" });
        }

        res.status(200).json(gotDevice)
    }catch(err){
        console.error("Error in getDevice:", err);
        next(err)
    }
}

export const getUserDevice = async(req,res,next)=>{
    try{
        const getAllDevice = await db.select().from(device).where(eq(device.userId, req.params.id))
        res.status(200).json(getAllDevice)
    }catch(err){
        next(err)
    }
}
