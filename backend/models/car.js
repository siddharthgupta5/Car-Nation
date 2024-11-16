const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    tags: {
      type: [String],
      validate: [arrayLimit, "Can upload upto 10 tag only."],
    },
    images: {
      type: [String],
      validate: [arrayLimit, "Can upload upto 10 images only."],
    },
  },
  {
    timestamps: true,
  }
);

function arrayLimit(val) {
  return val.length <= 10;
}

module.exports = mongoose.model("Car", carSchema);
