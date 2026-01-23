import Worker from '../models/Worker.js'

// CREATE WORKER
export const createWorker = async (req, res) => {
    try {
        const { name, phone, role, daily_wage } = req.body

        if (!name || !daily_wage) {
            return res.status(400).json({ message: 'Name and daily wage are required' })
        }

        const worker = await Worker.create({ name, phone, role, daily_wage })

        res.status(201).json(worker)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// GET ALL WORKERS
export const getWorkers = async (req, res) => {
    try {
        const workers = await Worker.find().sort({ created_at: -1 })

        res.json(workers)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// GET WORKER BY ID
export const getWorkerById = async (req, res) => {
    try {
        const { id } = req.params

        const worker = await Worker.findById(id)

        if (!worker) {
            return res.status(404).json({ error: 'Worker not found' })
        }

        res.json(worker)
    } catch (err) {
        res.status(404).json({ error: 'Worker not found' })
    }
}

// DELETE WORKER (optional)
export const deleteWorker = async (req, res) => {
    try {
        const { id } = req.params

        const worker = await Worker.findByIdAndDelete(id)

        if (!worker) {
            return res.status(404).json({ error: 'Worker not found' })
        }

        res.json({ message: 'Worker deleted successfully' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
