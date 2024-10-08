import express from 'express'
import { createTest, deleteTest, getAllAssesmentTest, getAllUserTest, getHandTest, getTest, updateTest } from '../controllers/Test.js'
import { verifyToken } from '../utils/verifyToken.js'

const router = express.Router()

router.put('/:id', updateTest)
router.delete('/:id',verifyToken, deleteTest)
router.get('/:id', getTest)
router.get('/assessment/:id', getAllAssesmentTest)
router.get('/user/:id', getAllUserTest)
router.post('/', createTest)
router.get('/hands/:id', getHandTest)

export default router