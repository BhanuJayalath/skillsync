import { verify } from 'crypto';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"Username is required"],
        unique: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: [true,"Email is required"],
        unique: true,
        minlength: 5,
        maxlength: 50
    },
    password: {
        type: String,
        required: [true,"Password is required"],
        minlength: 6,
        maxlength: 1024
    },
    company:{
        type: String,
        required: [true,"Company is required"],
        minlength: 3,
        maxlength: 50
    },
    isVerfiy: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;