const mongoose = require("mongoose");

const AgentSchema = new mongoose.Schema({
   name: {
      type: String
   },
});

module.exports = mongoose.model("AgentDatabase", AgentSchema);
