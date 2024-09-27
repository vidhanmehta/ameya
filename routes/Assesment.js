import express from 'express'
import { createAssesment, deleteAssesment, getUserAssesment, getAssesment, updateAssesment } from '../controllers/Assesment.js'
import { verifySpecialist, verifyToken } from '../utils/verifyToken.js'

const router = express.Router()

router.put('/:id',verifySpecialist, updateAssesment)
router.delete('/:id',verifySpecialist, deleteAssesment)
router.get('/:id',verifyToken, getAssesment)
router.get('/user/:id',verifyToken, getUserAssesment)
router.post('/',verifySpecialist, createAssesment)

export default router