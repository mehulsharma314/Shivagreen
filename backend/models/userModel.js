import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            sparse: true, 
            lowercase: true,
            trim: true,
        },
        mobile: {
            type: String,
            unique: true,
            sparse: true,
            trim: true,
        },
        password: {
            type: String,
            minlength: [6, 'Password must be at least 6 characters'],
            select: false, 
        },
        gender: {
            type: String
        },
        isGoogleAuth: {
            type: Boolean,
            default: false,
        },
        avatar: {
            type: String,
            default: '', 
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true, 
    }
);

const User = mongoose.model('User', userSchema);

export default User;
