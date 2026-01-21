import { supabase } from '../config/supabaseClient.js'

// CREATE WORKER
export const createWorker = async (req, res) => {
    try {
        const { name, phone, role, daily_wage } = req.body

        if (!name || !daily_wage) {
            return res.status(400).json({ message: 'Name and daily wage are required' })
        }

        const { data, error } = await supabase
            .from('workers')
            .insert([{ name, phone, role, daily_wage }])
            .select()

        if (error) throw error

        res.status(201).json(data[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// GET ALL WORKERS
export const getWorkers = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('workers')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) throw error

        res.json(data)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// GET WORKER BY ID
export const getWorkerById = async (req, res) => {
    try {
        const { id } = req.params

        const { data, error } = await supabase
            .from('workers')
            .select('*')
            .eq('id', id)
            .single()

        if (error) throw error

        res.json(data)
    } catch (err) {
        res.status(404).json({ error: 'Worker not found' })
    }
}

// DELETE WORKER (optional)
export const deleteWorker = async (req, res) => {
    try {
        const { id } = req.params

        const { error } = await supabase
            .from('workers')
            .delete()
            .eq('id', id)

        if (error) throw error

        res.json({ message: 'Worker deleted successfully' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
