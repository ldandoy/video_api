const mongoose = require("mongoose");

const twSchema = new mongoose.Schema({
    body: {
        type: String,
        require: true,
        trim: true,
        maxLength: 150
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    }
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

module.exports = mongoose.model('tws', twSchema)