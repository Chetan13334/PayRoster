import express from 'express'
import {
  createPayment,
  getPaymentsByWorker,
  getPaymentSummary
} from '../controllers/payments.controller.js'
import { protect } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/', protect, createPayment)
router.get('/worker/:workerId', protect, getPaymentsByWorker)
router.get('/worker/:workerId/summary', protect, getPaymentSummary)

export default router
