import { supabase } from '../config/supabaseClient.js'

// ADD PAYMENT
export const createPayment = async (req, res) => {
    try {
        const { worker_id, amount, type, note, payment_date } = req.body

        if (!worker_id || !amount || !type) {
            return res.status(400).json({ message: 'worker_id, amount and type are required' })
        }

        const { data, error } = await supabase
            .from('payments')
            .insert([
                {
                    worker_id,
                    amount,
                    type, // salary | extra
                    note,
                    payment_date
                }
            ])
            .select()

        if (error) throw error

        res.status(201).json(data[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// GET PAYMENTS BY WORKER
export const getPaymentsByWorker = async (req, res) => {
    try {
        const { workerId } = req.params

        const { data, error } = await supabase
            .from('payments')
            .select('*')
            .eq('worker_id', workerId)
            .order('payment_date', { ascending: false })

        if (error) throw error

        res.json(data)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// GET PAYMENT SUMMARY (TOTALS)
export const getPaymentSummary = async (req, res) => {
    try {
        const { workerId } = req.params

        const { data, error } = await supabase
            .from('payments')
            .select('amount, type')
            .eq('worker_id', workerId)

        if (error) throw error

        let totalSalary = 0
        let totalExtra = 0

        data.forEach(p => {
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
