const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    tws: [{type: mongoose.Types.ObjectId, ref: 'tws'}]
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

module.exports = mongoose.model('users', userSchema)