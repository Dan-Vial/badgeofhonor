// CRUD?

import { Request, Response } from 'express'

export function getContributions(_req: Request, res: Response) {
  res.send({ msg: 'contributions' })
}