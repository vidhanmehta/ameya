import express from 'express'
import { deleteUser, getAllUser, getUser, sendPasswordEmail, updateUser, updateUserPassword } from '../controllers/User.js'
import { verifySpecialist, verifyToken } from '../utils/verifyToken.js'


const router = express.Router()

router.put('/:id',verifyToken, updateUser)
router.delete('/:id',verifyToken, deleteUser)
router.get('/:id', getUser)
router.get('/', verifySpecialist, getAllUser)
router.put('/password/:id', updateUserPassword)
router.post('/forgot-password/', sendPasswordEmail)

export default router