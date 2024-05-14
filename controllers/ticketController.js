import Ticket from '../models/Ticket.js'
import User from '../models/User.js'

// CREATE
const createTicket = async (req, res) => {
  try {
    const ticketData = req.body

    // Validar que los datos del libro estén completos
    if (!ticketData.user) {
      return res.status(400).json({ msg: 'Authors data is missing' })
    }

    if (!ticketData) {
      return res.status(400).json({ msg: 'Book data is missing' })
    }

    if (!Array.isArray(ticketData.user)) {
      return res.status(400).json({ msg: 'Authors data should be an array' })
    }

    // Crear a los autores uno por uno y esperar a que todo se guarden en la base de datos
    const ticketModels = await Promise.all(ticketData.user.map(async name => {
      // Buscar si el autor ya existe
      const existingName = await User.findOne({ firstName: name.firstName, lastName: name.lastName})

      // Si el autor ya existe, devolverlo
      if (existingName) {
        return existingName
      }

      // Si el autor no existe, crearlo
      const newTicket = new User(name)
      return await User.create(newTicket)
    }))

    // Como ya se guardaron los autores, tengo que obtener los IDS de ellos para asignarlos al libro en cuestión
    ticketData.user = ticketModels.map(name => name.id)

    // Creamos el libro
    const newTicket = await Ticket.create(ticketData)
    res.status(201).json(newTicket)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}


// DELETE
const deleteTicketById = async (req, res) => {
  // Valido que el ID sea un ObjectID de Mongo válido (24 caracteres alfanuméricos)
  if (!req.params.ticketId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: 'Invalid ticket ID' })
  }

  // Si el query string destroy es true, borro el libro permanentemente de la base de datos. ?destroy=true
  if (req.query.destroy === 'true') {
    try {
      const ticket = await Ticket
        .findByIdAndDelete(req.params.ticketId)
      if (!ticket) {
        return res.status(404).json({ msg: 'Ticket not found' })
      }
      return res.status(204).json()
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  // Softdelete: Si el query string destroy no está presente o es false, cambio el campo isActive a false
  try {
    const ticket = await Ticket
      .findByIdAndUpdate(req.params.bookId, { isActive: false }, { new: false })
    if (!ticket || ticket.isActive === false) {
      return res.status(404).json({ msg: 'Book not found' })
    }
    res.status(204).json()
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export {
createTicket,
deleteTicketById
}