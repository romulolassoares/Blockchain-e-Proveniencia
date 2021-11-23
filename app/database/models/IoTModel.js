const mongoose = require('mongoose')
const IoTSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    descricao:{
        type: String,
        required: true
    },
    tipo:{
        type: String,
        required: true
    },
    pki:{
        type: String,
        required: true
    },
    operacao:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('IoTDatabase', IoTSchema)