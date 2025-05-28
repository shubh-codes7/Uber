import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

const captainSchema = mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, 'First name must be at least 3 character long']
    },

    lastname: {
      type: String,
      minlength: [3, 'Last name must be at least 3 character long']
    }
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be atleast 6 characters long"],
    select: false
  },

  socketId: {
    type: String
  },

  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive'
  },

  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, 'Color must be at least 3 characters long']
    },

    plate: {
      type: String,
      required: true,
      minlength: [3, 'Plate Number must be at least 3 characters long']
    },

    capacity: {
      type: Number,
      required: true,
      min: [1, 'Capacity must be at least 1']
    },

    type: {
      type: String,
      required: true,
      enum: ['car', 'auto', 'motorcycle']
    }
  },

  location: {
      lat: {
        type: Number
      },

      lng: {
        type: Number
      }
    }
})


captainSchema.methods.generateAuthToken = function(){
  return jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: '24h'})
}

captainSchema.methods.comparePassword = async function(password){
  return await bcrypt.compare(password, this.password)
}

captainSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next()

  this.password = await bcrypt.hash(this.password, 10)
  next()
})

export default mongoose.model('Captain', captainSchema)