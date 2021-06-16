import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

// const shippingAddressSchema = mongoose.Schema(
//   {
//     address: { type: String, required: true },
//     apartment: { type: String },
//     city: { type: String, required: true },
//     addressComment: { type: String },
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: 'User',
//     },
//   },
//   {
//     timestamps: true,
//   }
// )

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 6,
      maxlength: 255,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 1024,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

// custom made method for matching passwords and use in login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

//custom made method to handle hashing of password, to be used in registration
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
