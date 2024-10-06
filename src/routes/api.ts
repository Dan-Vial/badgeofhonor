// CRUD?

import express, { Request, Response } from 'express'
import { pgClient } from '../postgres'
import { getContributeurs } from '../controllers/contributeurs'
import { getContributions } from '../controllers/contributions'

const router = express.Router()

/**
 * Route test API and connexion db
 */
router.get('/', async function (_req: Request, res: Response) {
  const pgRes = await pgClient.query('SELECT NOW()')
  res.send({ api: 'API backend OK!!!', time: pgRes.rows[0].now })
})

/**
 * GET /contributeurs/{OWNER}_{REPO}
 */
router.get('/contributeurs', getContributeurs)

/**
 * GET /contributions/{OWNER}_{REPO}
 */
router.get('/contributions/:id', getContributions)

export default router
