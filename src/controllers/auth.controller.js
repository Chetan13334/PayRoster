import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { supabase } from '../config/supabaseClient.js'

// REGISTER
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields required' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const { data, error } = await supabase
            .from('users')
            .insert([{ name, email, password: hashedPassword }])
            .select()

        if (error) throw error

        res.status(201).json({ message: 'Account created successfully' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// LOGIN
export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single()

        if (error || !user) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        )

        res.json({ token })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
