import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import helmet from 'helmet'
import 'dotenv/config'
import './postgres'

import api from './routes/api'
import err from './routes/err'

const app = express()

app.use(logger('dev'))
app.use(compression())
app.use(express.json())

app.use(express.urlencoded({
  extended: false
}))

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      'img-src': ['\'self\'', 'https: data:']
    }
  }
}))

app.use(cookieParser())

/**
 * API
 */
app.use('/api', api)
app.use(express.static(join(dirname(fileURLToPath(import.meta.url)), 'public')))
app.use('*', err)

export default app
