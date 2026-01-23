import Payment from '../models/Payment.js'

export const createPayment = async (req, res) => {
    try {
        const { worker_id, amount, type, note, payment_date } = req.body

        if (!worker_id || !amount || !type) {
            return res.status(400).json({ message: 'worker_id, amount and type are required' })
        }

        const payment = await Payment.create({
            worker_id,
            amount,
            type, // salary | extra
            note,
            payment_date
        })

        res.status(201).json(payment)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// GET PAYMENTS BY WORKER
export const getPaymentsByWorker = async (req, res) => {
    try {
        const { workerId } = req.params

        const payments = await Payment.find({ worker_id: workerId })
            .sort({ payment_date: -1 })

        res.json(payments)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// GET PAYMENT SUMMARY (TOTALS)
export const getPaymentSummary = async (req, res) => {
    try {
        const { workerId } = req.params

        const payments = await Payment.find({ worker_id: workerId })

        let totalSalary = 0
        let totalExtra = 0

        payments.forEach(p => {
            if (p.type === 'salary') totalSalary += Number(p.amount)
            if (p.type === 'extra') totalExtra += Number(p.amount)
        })

        res.json({
            totalSalary,
            totalExtra,
            totalPaid: totalSalary + totalExtra
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
