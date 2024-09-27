import express from 'express'
import { createAccountAccess, deleteAccountAccess, getUserAccountAccess, getAccountAccess, updateAccountAccess } from '../controllers/AccountAccess.js'
import { verifySpecialist, verifyToken } from '../utils/verifyToken.js'

const router = express.Router()

router.put('/:id', updateAccountAccess)
router.delete('/:id', deleteAccountAccess)
router.get('/:id', getAccountAccess)
router.get('/user/:id',verifyToken, getUserAccountAccess)
router.post('/',verifySpecialist, createAccountAccess)

export default router