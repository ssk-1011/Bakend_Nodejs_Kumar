const mongoose = require('mongoose');

const firmSchema = new mongoose.Schema(
  {
    firmName: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    area: {
      type: String,
      required: true
    },
    category: [
      {
        type: String,
        enum: ['Veg', 'Non-Veg']
      }
    ],
    region: [
      {
        type: String,
        enum: [
          'North-Indian',
          'South-Indian',
          'West-Indian',
          'Chinese',
          'Italian',
          'Bakery'
        ]
      }
    ],
    offer: {
      type: String
    },
    image: {
      type: String
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor',
      required: true
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      }
    ]
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Firm || mongoose.model('Firm', firmSchema);
