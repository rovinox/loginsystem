const { MoodBadOutlined, ViewModuleSharp } = require("@material-ui/icons");
const mongoose = require("mongoose");
const schema = mongoose.Schema;
const computerSchema = new schema({
  make: {
    type: String,
    required: true,
  },
  cpu: {
    type: String,
    required: true,
  },
});

const Computer = mongoose.model("Computer", computerSchema);
module.exports = Computer;
