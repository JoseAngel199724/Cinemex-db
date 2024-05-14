import { connect } from './config/database.js'
import express from 'express'
import morgan from 'morgan'
import authRoutes from './Routes/authRoutes.js'
import movieRoutes from './Routes/movieRoutes.js'
import ticketRouter from './Routes/ticketRouter.js'
const PORT = process.env.PORT || 3000

connect() // Nos conectamos a la base de datos
const api = express()
// api.use(morgan('tiny'))
morgan.token('host', (req, res) => req.hostname)
morgan.token('param', (req, res, param) => req.params[param])
api.use(morgan(':host :method :url :status :param[id] :res[content-length] - :response-time ms - :date'))


api.use(express.json())
api.use('/api/v1/movies', movieRoutes)
api.use('/api/v1', authRoutes)
api.use('/api/v1/ticket', ticketRouter)

api.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} 🚀`)
})