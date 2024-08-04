import express from 'express'
import { createQueue, deleteQueue, getUserQueue, getDeviceQueue, getQueue, updateQueue, getAssessmentQueue } from '../controllers/Queue.js'

const router = express.Router()

router.put('/:id', updateQueue)
router.delete('/:id', deleteQueue)
router.get('/:id', getQueue)
router.get('/user/:id', getUserQueue)
router.get('/device/:id', getDeviceQueue)
router.get('/assessment/:id', getAssessmentQueue)
router.post('/', createQueue)

export default router