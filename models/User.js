// #1 importar mongoose
import mongoose from 'mongoose'

// #2 definir el schema
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: { type: Date },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    required: true,
    enum: ['ADMIN', 'CUSTOMER', 'CLIENTE'],
    default: 'CUSTOMER'
  },
  phone:{
type: Number,
required: true,
 unique: true
  },
  username:{
type: String,
required: true,
 unique: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true }) // timestamps: true agrega createdAt y updatedAt

// #3 Crear el modelo y exportarlo
export default mongoose.model('User', userSchema)