import express from 'express'
import { createMovies, getAllMovies, getMovieName, updateMovieById, deleteMovieById } from '../controllers/moviesController.js'


const movieRoutes = express.Router()

movieRoutes.post('/', createMovies)
movieRoutes.get('/', getAllMovies)
movieRoutes.get('/:movieId', getMovieName)
movieRoutes.patch('/:movieId',updateMovieById)
movieRoutes.delete('/:movieId', deleteMovieById)

export default movieRoutes