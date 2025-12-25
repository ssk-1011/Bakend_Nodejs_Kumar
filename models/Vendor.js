const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    firms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Firm'
      }
    ]
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Vendor || mongoose.model('Vendor', vendorSchema);
