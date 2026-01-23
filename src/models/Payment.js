import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    worker_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Worker',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['salary', 'extra'],
        required: true
    },
    note: {
        type: String,
        trim: true
    },
    payment_date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
