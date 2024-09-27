import express from 'express'
import { deleteSpecialist, getAllSpecialist, getSpecialist, sendPasswordEmail, updateSpecialist, updateSpecialistPassword } from '../controllers/Specialist.js'
import { verifySpecialist, verifyToken } from '../utils/verifyToken.js'


const router = express.Router()

router.put('/:id',verifyToken, updateSpecialist)
router.delete('/:id',verifyToken, deleteSpecialist)
router.get('/:id', getSpecialist)
router.get('/',verifySpecialist, getAllSpecialist)
router.put('/password/:id', updateSpecialistPassword)
router.post('/forgot-password/', sendPasswordEmail)

export default router