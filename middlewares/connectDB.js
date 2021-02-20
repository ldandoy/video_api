const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect('mongodb+srv://twUser:twUser@cluster0.q2ymj.mongodb.net/youtube_video?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('Connected to DB');
    });
}

module.exports = connectDB;