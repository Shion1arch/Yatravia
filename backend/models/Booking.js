const mongoose = require('mongoose');

// Generate a unique booking ID like YTV-20240623-A3X7
function generateBookingId() {
  const date = new Date();
  const datePart = date.getFullYear().toString() +
    String(date.getMonth() + 1).padStart(2, '0') +
    String(date.getDate()).padStart(2, '0');
  const randPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `YTV-${datePart}-${randPart}`;
}

// Generate a unique payment ID like PAY-F8K2-9QNM
function generatePaymentId() {
  const part1 = Math.random().toString(36).substring(2, 6).toUpperCase();
  const part2 = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `PAY-${part1}-${part2}`;
}

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      unique: true,
    },
    paymentId: {
      type: String,
      unique: true,
    },
    // Destination info
    destinationId: {
      type: String,
      default: '',
    },
    destinationName: {
      type: String,
      required: [true, 'Destination name is required'],
    },
    // Traveler info
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    // Trip details
    travelDate: {
      type: Date,
      required: [true, 'Travel date is required'],
    },
    numberOfPeople: {
      type: Number,
      required: [true, 'Number of people is required'],
      min: 1,
      max: 50,
      default: 1,
    },
    guide: {
      type: String,
      enum: ['Local Guide', 'Expert Guide', 'Audio Guide', 'None'],
      default: 'Local Guide',
    },
    specialRequests: {
      type: String,
      trim: true,
      default: '',
    },
    // Payment
    amount: {
      type: Number,
      default: 0,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'confirmed'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

// Auto-generate bookingId and paymentId before saving
bookingSchema.pre('save', function (next) {
  if (!this.bookingId) this.bookingId = generateBookingId();
  if (!this.paymentId) this.paymentId = generatePaymentId();
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
