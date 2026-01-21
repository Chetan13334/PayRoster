import express from 'express'
import {
  createWorker,
  getWorkers,
  getWorkerById,
  deleteWorker
} from '../controllers/workers.controller.js'

const router = express.Router()

router.post('/', createWorker)
router.get('/', getWorkers)
router.get('/:id', getWorkerById)
router.delete('/:id', deleteWorker)

export default router
