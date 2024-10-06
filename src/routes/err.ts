import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import express, { Request, Response } from 'express'

const router = express.Router()

const env: string = process.env.NODE_ENV || 'development'
const paths = {
  development: join(dirname(fileURLToPath(import.meta.url)), '../public/error.html'),
  production: join(dirname(fileURLToPath(import.meta.url)), './public/error.html'),
}
const errorFilePath: string = paths[env as keyof typeof paths] || paths.development

router.get('/', function (_req: Request, res: Response) {
  res.sendFile(errorFilePath)
})

export default router
