const mongoose = require("mongoose");

const EntitySchema = new mongoose.Schema({
   name: {
      type: String
   },
   info: {
      type: Object
   }
});

module.exports = mongoose.model("EntityDatabase", EntitySchema);
