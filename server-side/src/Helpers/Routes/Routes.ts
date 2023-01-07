import { Container } from 'typedi'
import express, { Request, Response } from 'express'

import { AuthService } from 'Services/Data/Auth.Service'

const router = express.Router()

router.post('/signin', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      throw new Error('Credentials are not provided.')
    }

    res.status(200).json(await (Container.get(AuthService)).signIn(email.trim().toLowerCase(), password))
  } catch (err: any) {
    res.status(401).json({
      message: err.message,
      status: 401
    })
  }
})

export default router
