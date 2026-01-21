import express from 'express'
import {
  createPayment,
  getPaymentsByWorker,
  getPaymentSummary
} from '../controllers/payments.controller.js'

const router = express.Router()

router.post('/', createPayment)
router.get('/worker/:workerId', getPaymentsByWorker)
router.get('/worker/:workerId/summary', getPaymentSummary)

export default router
