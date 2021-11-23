const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    descricao:{
        type: String,
        required: true
    },
    permissao:{
        type: String,
        required: true
    },
    pki:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('UserDatabase', UserSchema)