import express from 'express'
import dotenv from 'dotenv'
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import TestRoute from './routes/Test.js';
import DeviceRoute from './routes/Device.js';
import QueueRoute from './routes/Queue.js';
import AssesmentRoute from './routes/Assesment.js';
import RemarksRoute from './routes/Remarks.js'
import AccountAccessRoute from './routes/AccountAccess.js'
import UserRoute from './routes/User.js'
import DeviceQueueRoute from './routes/DeviceQueue.js'
import authRoute from './routes/Auth.js'
import cookieParser from 'cookie-parser';
import SpecialistRoute from './routes/Specialist.js'
import SpecialistQueueRoute from './routes/SpecialistQueue.js'

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3005;

app.use(express.json())
app.use(cookieParser())

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
app.use('/api/accountAccess', AccountAccessRoute)
app.use('/api/test', TestRoute)
app.use('/api/user', UserRoute)
app.use('/api/auth', authRoute)
app.use('/api/device-queue/', DeviceQueueRoute)
app.use('/api/specialist', SpecialistRoute)
app.use('/api/specialist-queue', SpecialistQueueRoute)

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

