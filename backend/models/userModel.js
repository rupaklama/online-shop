import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Using Schema object to create different properties for this new collection.
// Schema will describe what each individual record with all db properties.
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    // instead of creating createdAt & updatedAt fields above
    // with mongoose we can pass second arg of option of timestamps prop &
    // it will create createdAt & updatedAt fields automatically
    timestamps: true,
  }
);

// verifying user password to see if it matches
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// telling mongoose to create new model class instance - User
// first arg - name of the collection & second arg - name of the the Schema
const User = mongoose.model('User', userSchema);

export default User;
