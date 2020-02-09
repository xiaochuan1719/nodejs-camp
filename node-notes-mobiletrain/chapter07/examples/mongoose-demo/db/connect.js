const mongoose = require('mongoose');

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

exports.start = (success) => {
    mongoose.connect('mongodb://localhost/db2020', options);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('connected db: db2020');
        if (success) {
            success();
        }
    })
};