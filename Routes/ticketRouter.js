import express from 'express'
import { createTicket, deleteTicketById } from '../controllers/ticketController.js'
import { isUser } from '../middlewares/isUser.js'
import { isAdmin } from '../middlewares/isAdmin.js'
import { isCliente } from '../middlewares/isCliente.js'
const ticketRouter = express.Router()

ticketRouter.post('/register', createTicket)
ticketRouter.post('/delete', deleteTicketById)

export default ticketRouter