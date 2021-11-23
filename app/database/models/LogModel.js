const mongoose = require('mongoose')
const LogSchema = new mongoose.Schema({
    transactionID:{
        type: String,
        required: true
    },
    userPki:{
        type: String,
        required: true
    },
    iotPki:{
        type: String,
        required: true
    },
    task:{
        type: String,
        required: true
    },
    timestamp:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('LogDatabase', LogSchema)