const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename: String,
    code: {
        type: Number,
        unique: true,
        required: true
    },
    url: String
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    files: [fileSchema]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
