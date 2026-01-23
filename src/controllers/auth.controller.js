import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// REGISTER
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields required' })
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({ name, email, password: hashedPassword })

        res.status(201).json({ message: 'Account created successfully' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// LOGIN
export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET || 'default_secret_key_for_testing_only',
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
        )

        res.json({ token })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
