import express from 'express'
import { createSpecialistQueue, deleteSpecialistQueue, updateSpecialistQueue, getSpecialistQueue, getAllSpecialistQueue} from '../controllers/SpecialistQueue.js'

const router = express.Router()

router.put('/:id', updateSpecialistQueue)
router.delete('/:id', deleteSpecialistQueue)
router.get('/:id', getSpecialistQueue)
router.get('/', getAllSpecialistQueue)
router.post('/', createSpecialistQueue)

export default router