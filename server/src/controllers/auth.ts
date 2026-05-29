import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import pool from '../config/db'


const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  role: z.enum(['customer', 'owner']).optional()
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
})

export const register = async (req: Request, res: Response) => {
  const validation = registerSchema.safeParse(req.body)

  if (!validation.success) {
    return res.status(400).json({
      message: 'Validation error',
      errors: validation.error.flatten().fieldErrors
    })
  }

  const { email, password, first_name, last_name, role } = validation.data

  try {
    const existing = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    )

    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'Email already in use' })
    }
    const password_hash = await bcrypt.hash(password, 10)

    const result = await pool.query(
      `INSERT INTO users (email, password_hash, first_name, last_name, role)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, email, first_name, last_name, role`,
      [email, password_hash, first_name, last_name, role || 'customer']
    )

    const user = result.rows[0]

    // Generate token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    )

    res.status(201).json({ user, token })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const login = async (req: Request, res: Response) => {
  const validation = loginSchema.safeParse(req.body)

  if (!validation.success) {
    return res.status(400).json({
      message: 'Validation error',
      errors: validation.error.flatten().fieldErrors
    })
  }

  const { email, password } = validation.data

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    )

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const user = result.rows[0]

    const valid = await bcrypt.compare(password, user.password_hash)

    if (!valid) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    )

    res.json({
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role
      },
      token
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}