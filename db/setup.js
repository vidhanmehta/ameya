import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import dotenv from 'dotenv';
import { assessment, assessmentRelations, device, deviceRelations, remarks, remarksRelations, reminder, reminderRelations, accountAccess, test, testRelations, user, userRelations, accountRelations, queueRelations } from './schema.js';

dotenv.config();

if (!process.env.DATABASE_URL) {
    throw new Error("DB credentials error");
    }
    const connection = neon(process.env.DATABASE_URL);
    export const db = drizzle(connection, {
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