const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_HOST);

module.exports = mongoose;