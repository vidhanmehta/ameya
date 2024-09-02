import express from 'express'
import { createDevice, deleteDevice, getUserDevice, getDevice, updateDevice } from '../controllers/Device.js'
import { verifyToken } from '../utils/verifyToken.js'

const router = express.Router()

router.put('/:id',verifyToken, updateDevice)
router.delete('/:id', deleteDevice)
router.get('/:id', getDevice)
router.get('/user/:id', getUserDevice)
router.post('/',verifyToken, createDevice)

export default router