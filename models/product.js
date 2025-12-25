const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String
    },
    category: [
      {
        type: String,
        enum: ['Veg', 'Non-Veg']
      }
    ],
    image: {
      type: String
    },
    bestSeller: {
      type: Boolean,
      default: false
    },
    firm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Firm',
      required: true
    }
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Product || mongoose.model('Product', productSchema);
