import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import { assessment, assessmentRelations, device, deviceRelations, remarks, remarksRelations, accountAccess, test, testRelations, user, userRelations, queueRelations, Specialist, SpecialistQueue, specialistRelations, accountAccessRelations, queue, DeviceQueue } from './schema.js';

dotenv.config();

if (!process.env.DATABASE_URL) {
    throw new Error("DB credentials error");
    }
    const client = postgres(process.env.DATABASE_URL, {
        ssl: { rejectUnauthorized: false },
        prepare: false
    });
    export const db = drizzle(client, {
        schema: {
            user,
            assessment,
            test,
            device, 
            Specialist,
            SpecialistQueue,
            accountAccess,
            remarks,
            queue,
            DeviceQueue,
            userRelations,
            assessmentRelations,
            specialistRelations,
            testRelations, 
            deviceRelations,
            remarksRelations,
            accountAccessRelations,
            queueRelations
        }
    });