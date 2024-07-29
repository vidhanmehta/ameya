import express from 'express'
import { createAccountAccess, deleteAccountAccess, getUserAccountAccess, getAccountAccess, updateAccountAccess } from '../controllers/AccountAccess.js'
import { verifyDoctorOperator, verifyToken } from '../utils/verifyToken.js'

const router = express.Router()

router.put('/:id', updateAccountAccess)
router.delete('/:id', deleteAccountAccess)
router.get('/:id', getAccountAccess)
router.get('/user/:id',verifyToken, getUserAccountAccess)
router.post('/',verifyDoctorOperator, createAccountAccess)

export default router