import express from 'express'
import { createAssesment, deleteAssesment, getUserAssesment, getAssesment, updateAssesment } from '../controllers/Assesment.js'
import { verifyDoctorOperator, verifyToken } from '../utils/verifyToken.js'

const router = express.Router()

router.put('/:id',verifyDoctorOperator, updateAssesment)
router.delete('/:id',verifyDoctorOperator, deleteAssesment)
router.get('/:id',verifyToken, getAssesment)
router.get('/user/:id',verifyToken, getUserAssesment)
router.post('/',verifyDoctorOperator, createAssesment)

export default router