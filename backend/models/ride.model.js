import mongoose from 'mongoose'


const rideSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Captain',
  },
  pickup: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  fare: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'ongoing', 'cancelled', 'completed'],
    default: "pending"
  },
  duration: {
    type: Number
  },
  distance: {
    type: Number
  },
  paymentID: {
    type: String
  },
  orderId: {
    type: String
  },
  signature: {
    type: String
  },
  otp:{
    type: String,
    select: false,
    required: true
  }
})

export default mongoose.model('Ride', rideSchema)