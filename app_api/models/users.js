const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    hash: String,
    salt: String
});

userSchema.methods.setPassword = (password) => {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync
        (password, this.salt, 10000, 64, 'sha512')
        .toString('hex');
};

userSchema.methods.validatePassword = (password) => {
    const hash = crypto.pbkdf2Sync
        (password, this.salt, 10000, 64, 'sha512')
        .toString('hex');
    return this.hash == hash;
};

userSchema.methods.generateJwt = () => {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign({
        _id: this.id,
        name: this.name,
        email: this.email,
        exp: parseInt(expiry.getTime() / 1000, 10)
    }, process.env.JWT_SECRET)
};

mongoose.model('User', userSchema);