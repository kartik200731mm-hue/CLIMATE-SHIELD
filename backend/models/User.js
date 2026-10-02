import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
      maxlength: [60, 'Name cannot exceed 60 characters']
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false // Never return password in queries by default
    },
    preferences: {
      defaultLocation: {
        type: String,
        default: 'New Delhi'
      },
      mode: {
        type: String,
        default: 'Student'
      },
      personaId: {
        type: String,
        default: 'student'
      },
      activity: {
        type: String,
        default: 'College'
      },
      commuteType: {
        type: String,
        enum: ['Walk / Cycle', 'Public Transit', 'Two Wheeler', 'Car / Cab'],
        default: 'Public Transit'
      },
      sensitiveAirQuality: {
        type: Boolean,
        default: false
      },
      notificationAlerts: {
        type: Boolean,
        default: true
      }
    }
  },
  {
    timestamps: true
  }
);

// Hash password before saving
userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare input password with stored hash
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Clean object response - never expose password
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
