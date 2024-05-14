import mongoose from 'mongoose'

const genreEnum = ['Accion', 'Aventura', 'Catastrofe', 'Ciencia Ficcion','Comedia', 'Documentales', 'Drama', 'Fantasía']



const moviesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    director: { type: String },
    releaseDate: { type: Date }, // YYYY-MM-DD
    qualification: { type: Number, required: true },
    duration: { type: String, required: true },
    gender: { type: String, required: true, enum: genreEnum },
    isActive: { type: Boolean, default: true }
}, { timestamps: true })// timestamps: true agrega createdAt y updatedAt



// #3 Crear el modelo y exportarlo
const Movies = mongoose.model('Movies', moviesSchema)
export default Movies