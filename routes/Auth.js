import express from "express"
import { createSpecialist, createUser, getSpecialist, getUser } from "../controllers/Auth.js";

const router = express.Router();

router.post('/register',createUser)
router.post('/login',getUser)
router.post('/register-specialist',createSpecialist)
router.post('/login-specialist',getSpecialist)

export default router