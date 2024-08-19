import express from 'express'
import { createQueue, deleteQueue, updateQueue, getQueue, getAllQueue} from '../controllers/DeviceQueue.js'

const router = express.Router()

router.put('/:id', updateQueue)
router.delete('/:id', deleteQueue)
router.get('/:id', getQueue)
router.get('/', getAllQueue)
router.post('/', createQueue)

export default router