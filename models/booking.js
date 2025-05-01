import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    bookingid: {
        type: String,
        required: true,
        unique: true
    },
    event: {
        type: String,
        required: true
    },
    participant: {
        type: Number,
        required: true
    }
}, { timestamps: true });

// The collection name will be 'bookingdetails' (lowercased and pluralized)
const BookingModel = mongoose.model('bookingdetails', bookingSchema);

export default BookingModel;
