// CRUD?

import { Request, Response } from 'express'
import { readFile } from 'fs/promises'

export async function getContributeurs(_req: Request, res: Response) {
  const data = await readFile('./data.json')
  res.json(JSON.parse(data.toString()))
}
