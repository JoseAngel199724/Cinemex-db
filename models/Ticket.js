import mongoose, { Types } from "mongoose";



const moviesSchema = new mongoose.Schema({
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    quantity: { type: Number, required: true },
    ticketValue: { type: Number, default: 85},
    totalValue:{
        type: Number,
        get: function(){
            return this.quantity * this.ticketValue
        }
    },
    showTime: { type: String, required: true },
    seat: { type: String, required: true },
    isActive: { type: Boolean, default: true }
}, { timestamps: true })// timestamps: true agrega createdAt y updatedAt



// #3 Crear el modelo y exportarlo
const Ticket = mongoose.model('Ticket', moviesSchema)
export default Ticket




