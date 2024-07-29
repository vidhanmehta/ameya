import express from 'express'
import { createRemarks, deleteRemarks, getAssessmentRemarks, getAssignerRemarks, updateRemarks } from '../controllers/Remarks.js'
import { verifyDoctorOperator } from '../utils/verifyToken.js'

const router = express.Router()

router.put('/:id',verifyDoctorOperator, updateRemarks)
router.delete('/:id',verifyDoctorOperator, deleteRemarks)
router.get('/user/:id', getAssessmentRemarks)
router.get('/assigner/:id', getAssignerRemarks)
router.post('/',verifyDoctorOperator, createRemarks)

export default router