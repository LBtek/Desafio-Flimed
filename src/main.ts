import express, { Request, Response, ErrorRequestHandler } from 'express'
import passport from 'passport'
import apiRoutes from './routes'

const cors = require('cors')

const app = express()

app.use(express.json())

app.use(
  cors({
    origin: '*'
  })
)

app.use(passport.initialize())

app.use(apiRoutes)

app.use((req: Request, res: Response) => {
  res.status(404)
  res.json({ error: 'Endpoint não encontrado.' })
})

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status)
  } else {
    res.status(400) // Bad Request
  }
  if (err.message) {
    res.json({ error: err.message })
  } else {
    res.json({ error: 'Ocorreu algum erro.' })
  }
}

app.use(errorHandler)

export default app
