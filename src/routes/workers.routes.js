import express from 'express'
import {
  createWorker,
  getWorkers,
  getWorkerById,
  deleteWorker
} from '../controllers/workers.controller.js'
import { protect } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/', protect, createWorker)
router.get('/', protect, getWorkers)
router.get('/:id', protect, getWorkerById)
router.delete('/:id', protect, deleteWorker)

export default router
