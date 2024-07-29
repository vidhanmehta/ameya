import express from 'express'
import { createReminder, deleteReminder, getUserReminder, getAssesmentReminder, getReminder, updateReminder } from '../controllers/Reminder.js'

const router = express.Router()

router.put('/:id', updateReminder)
router.delete('/:id', deleteReminder)
router.get('/:id', getReminder)
router.get('/user/:id', getUserReminder)
router.get('/assesment/:id', getAssesmentReminder)
router.post('/', createReminder)

export default router