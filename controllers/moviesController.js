import Movies from '../models/Movies.js'

// Create
const createMovies = async (req, res) => {
  if (!req.body.name || !req.body.director || !req.body.releaseDate || !req.body.qualification || !req.body.duration || !req.body.gender) {
    return res.status(400).json({ msg: 'Missing required fields' })
  }

  try {
    const newMovies = await Movies.create(req.body)
    res.status(201).json(newMovies)
  } catch (error) {
    res.status(400).json({ msg: 'Error Creating Movies', error })
  }
}

// Read

// - Get all cars
const getAllMovies = async (req, res) => {
  try {
    const Movie = await Movies.find({ isActive: true })
    res.status(200).json(Movie)
  } catch (error) {
    res.status(400).json({ msg: 'Error Getting Movie', error })
  }
}

// - Get car by id
const getMovieName = async (req, res) => {
  try {
    const Movie = await Movies.find({ name: req.params.movieId, isActive: true })
    res.status(200).json(Movie)
  } catch (error) {
    res.status(400).json({ msg: 'Error Getting Movie', error })
  }
}

// Update
const updateMovieById = async (req, res) => {
  if (Object.keys(req.body).length === 0) return res.status(400).json({ msg: 'No data to update (empty body)' })
  // Para actualizar, normalmente comprobamos si el carro existe (findById) y luego lo actualizamos (update).
  // Pero en este caso, usaremos el método findByIdAndUpdate que hace ambas cosas.
  // Mandamos el id del carro a actualizar (req.params.carId), los datos a actualizar (req.body) y un objeto con la opción { new: true } para que nos devuelva el carro actualizado y no el carro antes de actualizar.

  try {
    const updatedMovie = await Movies.findByIdAndUpdate(req.params.MovieId, req.body, { new: true })
    res.status(200).json(updatedMovie)
  } catch (error) {
    res.status(400).json({ msg: 'Error Updating Movie', error })
  }
}

// Delete
const deleteMovieById = async (req, res) => {
  if (!req.params.movieId) return res.status(400).json({ msg: 'Missing movieId' })

  // Si el query string destroy es true, eliminamos el carro fisicamente de la base de datos.
  if (req.query.destroy === 'true') {
    try {
      const deletedMovie = await Movies.findByIdAndDelete(req.params.movieId)
      if (deletedMovie === null) return res.status(404).json({ msg: 'Delete: Movie not found' })
      return res.status(204).json() // No content
    } catch (error) {
      return res.status(400).json({ msg: 'Error Deleting Movi', error })
    }
  }

  // Si el query string destroy es false o no se envía, actualizamos el campo isActive a false.
  try {
    const updateMovie = await Movies.findByIdAndUpdate(req.params.movieId, { isActive: false }, { new: true })  
    if (updateMovie === null) return res.status(404).json({ msg: 'Delete: Movie not found' })
    return res.status(204).json() // No content
  } catch (error) {
    return res.status(400).json({ msg: 'Error Deleting Movie', error })
  }
}

export {
  createMovies,
  getAllMovies,
  getMovieName,
  updateMovieById,
  deleteMovieById
}