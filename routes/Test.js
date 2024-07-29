import express from 'express'
import { createTest, deleteTest, getAllAssesmentTest, getAllUserTest, getTest, updateTest } from '../controllers/Test.js'
import { verifyDoctorOperator } from '../utils/verifyToken.js'

const router = express.Router()

router.put('/:id', updateTest)
router.delete('/:id',verifyDoctorOperator, deleteTest)
router.get('/:id', getTest)
router.get('/assesment/:id', getAllAssesmentTest)
router.get('/user/:id', getAllUserTest)
router.post('/', createTest)

export default router