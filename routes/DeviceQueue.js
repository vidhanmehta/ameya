import express from 'express'
import { createQueue, deleteQueue, updateQueue, getQueue} from '../controllers/DeviceQueue.js'

const router = express.Router()

router.put('/:id', updateQueue)
router.delete('/:id', deleteQueue)
router.get('/:id', getQueue)
router.post('/', createQueue)

export default router