import { Container } from 'typedi'
import express, { Request, Response } from 'express'

import { AuthService } from 'Services/Data/Auth.Service'

const router = express.Router()

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      throw new Error('Credentials are not provided.')
    }
    const _email = email.trim().toLowerCase()
    const authService = Container.get(AuthService)
    const response = await authService.login(_email, password)

    res.status(200).json(response)
  } catch (err: any) {
    res.status(401).json({
      message: err.message,
      status: 401
    })
  }
})

export default router
