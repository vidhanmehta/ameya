import { Specialist, SpecialistQueue, user } from '../db/schema.js';
import { db } from '../db/setup.js';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { createError } from "../utils/errors.js";
import jwt from 'jsonwebtoken';

export const createUser = async (req, res, next) => {

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    try {
        const newUser = await db.insert(user).values({
            ...req.body,
            password: hash
        }).returning();
        res.status(200).json(newUser);
    } catch (err) {
        next(err);
    }
};

export const getUser = async (req, res, next) => {

     /* #swagger.security = [{
            "bearerAuth": []
    }] */

    try {
        const getUser = await db.query.user.findFirst({
            where: eq(user.email, req.body.email),
            with: {
                device: true,
                assessment: true,
                accounts: true
            }
        });
        console.log(getUser)

        if (!getUser) return next(createError(404, 'No User found'));

        const isPasswordCorrect = await bcrypt.compare(req.body.password, getUser.password);
        if (!isPasswordCorrect) return next(createError(400, 'Incorrect Password'));

        const token = jwt.sign({ id: getUser.id }, process.env.JWT_SECRET);
        console.log(token)

        const { password, ...other } = getUser;

        res.cookie('access_token', token, {
            httpOnly: true
        }).status(200).json({ ...other });

    } catch (err) {
        next(err);
    }
};

export const createSpecialist = async (req, res, next) => {

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    try {
        const newSpecialist = await db.insert(Specialist).values({
            ...req.body,
            password: hash
        }).returning();
        res.status(200).json(newSpecialist);
    } catch (err) {
        next(err);
    }
};

export const getSpecialist = async (req, res, next) => {

    /* #swagger.security = [{
           "bearerAuth": []
   }] */

   try {

        const isSpecialistQueue = await db.select().from(SpecialistQueue).where(eq(SpecialistQueue.email, req.body.email))
        if(!isSpecialistQueue.length){

            const getSpecialist = await db.query.Specialist.findFirst({
                where: eq(Specialist.email, req.body.email),
                with: {
                    accounts: true
                }
            });
            console.log(getSpecialist)
    
            if (!getSpecialist) return next(createError(404, 'No User found'));
    
            const isPasswordCorrect = await bcrypt.compare(req.body.password, getSpecialist.password);
            if (!isPasswordCorrect) return next(createError(400, 'Incorrect Password'));
    
            const token = jwt.sign({ id: getSpecialist.id }, process.env.JWT_SECRET);
            console.log(token)
    
            const { password, ...other } = getSpecialist;
    
            res.cookie('access_token', token, {
                httpOnly: true
            }).status(200).json({ ...other });
        
        }else{
            res.status(400).json({
                "message": "Specialist is not approved yet"
            })
        }
        } catch (err) {
       next(err);
   }
};