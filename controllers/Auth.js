import { user } from '../db/schema.js';
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
                accounts: {
                    with: {
                        acc_connect: true
                    }
                },
            }
        });
        console.log(getUser)

        if (!getUser) return next(createError(404, 'No User found'));

        const isPasswordCorrect = await bcrypt.compare(req.body.password, getUser.password);
        if (!isPasswordCorrect) return next(createError(400, 'Incorrect Password'));

        const token = jwt.sign({ id: getUser.id, role: getUser.role }, process.env.JWT_SECRET);
        console.log(token)

        const { password, role, ...other } = getUser;

        res.cookie('access_token', token, {
            httpOnly: true
        }).status(200).json({ ...other });

    } catch (err) {
        next(err);
    }
};
