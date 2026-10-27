import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    // required: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'author'],
    default: 'author'
  }
});

userSchema.pre('save', function(next){
    if(this.isModified('password')){
        this.password= bcrypt.hashSync(this.password, 10)
    }
    next
})

const User = mongoose.model('News-users', userSchema);

export default User;