import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import { assessment, assessmentRelations, device, deviceRelations, remarks, remarksRelations, reminder, reminderRelations, accountAccess, test, testRelations, user, userRelations, accountRelations, queueRelations } from './schema.js';

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
            accountAccess,
            assessment,
            test,
            device, 
            reminder,
            remarks,
            userRelations,
            assessmentRelations,
            testRelations, 
            deviceRelations,
            reminderRelations,
            remarksRelations,
            accountRelations,
            queueRelations
        }
    });