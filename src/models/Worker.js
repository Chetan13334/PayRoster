import mongoose from 'mongoose';

const workerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        trim: true
    },
    daily_wage: {
        type: Number,
        required: [true, 'Daily wage is required']
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Worker = mongoose.model('Worker', workerSchema);

export default Worker;
