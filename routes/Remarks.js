import express from 'express'
import { createRemarks, deleteRemarks, getAssessmentRemarks, getAssignerRemarks, updateRemarks } from '../controllers/Remarks.js'
import { verifySpecialist } from '../utils/verifyToken.js'

const router = express.Router()

router.put('/:id',verifySpecialist, updateRemarks)
router.delete('/:id',verifySpecialist, deleteRemarks)
router.get('/user/:id', getAssessmentRemarks)
router.get('/assigner/:id', getAssignerRemarks)
router.post('/',verifySpecialist, createRemarks)

export default router