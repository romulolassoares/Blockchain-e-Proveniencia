const mongoose = require("mongoose");

const ProvSchema = new mongoose.Schema({
   entity: {
      type: String
   },
   activity: {
      type: String
   },
   agent: {
      type: String
   },
   relationship:{
      type: Object,
  },
   timestamp:{
      type: String,
   },
});

module.exports = mongoose.model("ProvDatabase", ProvSchema);
