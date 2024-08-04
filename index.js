import express from 'express'
import dotenv from 'dotenv'
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import TestRoute from './routes/Test.js';
import DeviceRoute from './routes/Device.js';
import QueueRoute from './routes/Queue.js';
import AssesmentRoute from './routes/Assesment.js';
import RemarksRoute from './routes/Remarks.js'
import ReminderRoute from './routes/Reminder.js'
import AccountAccessRoute from './routes/AccountAccess.js'
import UserRoute from './routes/User.js'
import authRoute from './routes/Auth.js'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from "./docs/swagger.json" assert { type: "json" };
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();
const PORT = 3005;

app.use(express.json())
app.use(cookieParser())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const connect = async () => {
    try {
        const connection = neon(process.env.DATABASE_URL);
        const db = drizzle(connection);
    } catch (error) {
        console.error("Database connection error:", error);
        throw error;
    }
};

app.get('/', (req, res)=>{
    res.status(200);
    res.send("Welcome to root URL of Server");
});

app.use((err,req,res,next)=>{
    console.log('error')
    return res.status(500).json({
        'success':false,
        'status' : err.status,
        'message': err.message,
        'stack'  : err.stack
     }) 
})

app.use('/api/assessment', AssesmentRoute)
app.use('/api/device', DeviceRoute)
app.use('/api/queue', QueueRoute)
app.use('/api/remarks', RemarksRoute)
app.use('/api/reminder', ReminderRoute)
app.use('/api/accountAccess', AccountAccessRoute)
app.use('/api/test', TestRoute)
app.use('/api/user', UserRoute)
app.use('/api/auth', authRoute)

app.listen(PORT, (error) => {
    if (!error) {
        connect().then(() => {
            console.log("Server is Successfully Running, and App is listening on port " + PORT);
        }).catch(err => {
            console.error("Failed to connect to the database:", err);
        });
    } else {
        console.error("Error occurred, server can't start", error);
    }
});

