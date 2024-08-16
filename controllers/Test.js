import {test} from '../db/schema.js';
import { db } from '../db/setup.js';
import { eq } from 'drizzle-orm';

export const updateTest =async(req,res,next)=>{
    try{
        const updatedTest = await db.update(test).set(req.body).where(eq(test.id, req.params.id)) 
        res.status(200).json(updatedTest)       
    }catch(err){
        next(err)
    }
}

export const createTest = async(req,res,next)=>{
    try{
        const createdTest = await db.insert(test).values(req.body).returning()
        res.status(200).json(createdTest)
    }catch(err){
        next(err)
    }
}

export const deleteTest = async(req,res,next)=>{
    try{
        const deletedTest = await db.delete(test).where(eq(test.id, req.params.id))
        res.status(200).json('Deleted Test')
    }catch(err){
        next(err)
    }
}

export const getTest = async (req,res,next)=>{
    try{
        // const gotTest = await db.select().from(Test).leftJoin(FamilyMember, eq(req.params.id, FamilyMember.TestId))
        const gotTest = await db.query.test.findFirst({
            where: (Test, {eq}) => eq(Test.id, req.params.id),
        })

        if (!gotTest) {
            return res.status(404).json({ message: "Test not found" });
        }

        res.status(200).json(gotTest)
    }catch(err){
        console.error("Error in getTest:", err);
        next(err)
    }
}

export const getAllAssesmentTest = async(req,res,next)=>{
    try{
        const getAllTest = await db.select().from(test).where(eq(test.assesmentId, req.params.id))
        res.status(200).json(getAllTest)
    }catch(err){
        next(err)
    }
}

export const getAllUserTest = async(req,res,next)=>{
    try{
        const getAllTest = await db.select().from(test).where(eq(test.userId, req.params.id))
        res.status(200).json(getAllTest)
    }catch(err){
        next(err)
    }
}

export const getHandTest = async(req, res, next)=>{
    try{
        const latestRightHandTest = await db
        .select()
        .from(test)
        .where(
            eq(test.userId, req.params.id), // Filter by userId
            eq(test.hand, 'Right')   // Filter by right hand
        )
        .orderBy(desc(testTable.createdAt)) // Order by latest first
        .limit(1); // Get the most recent test

        // Fetch the latest left hand test for the user
        const latestLeftHandTest = await db
        .select()
        .from(test)
        .where(
            eq(test.userId, req.params.id), // Filter by userId
            eq(test.hand, 'Reft')    // Filter by left hand
        )
        .orderBy(desc(test.createdAt)) // Order by latest first
        .limit(1); // Get the most recent test

        res.status(200).json({"Left": latestLeftHandTest, "Right": latestRightHandTest})

    }catch(err){
        next(err)
    }
}