const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    uid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    brewerId: String,
    review: String,
  },
  { timestamps: true }
);

module.exports= mongoose.model("Review", reviewSchema);
