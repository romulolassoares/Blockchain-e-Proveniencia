const mongoose = require('mongoose')
const DocumentSchema = new mongoose.Schema({
   name: {
      type: String
   },
   base64: {
      type: String
   },
   provType: {
      type: String
   }
})

module.exports = mongoose.model('DocumentDatabase', DocumentSchema)