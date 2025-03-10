import { verify } from 'crypto';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        unique: true,
        minlength: 5,
        maxlength: 50
    },
    password: {
        type: String, //removed the passwords's required field because its causing an issues when connecting with social accounts
        minlength: 6,
        maxlength: 1024
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