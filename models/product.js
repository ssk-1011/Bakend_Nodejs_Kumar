const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true
    },
    price: {
      type: Number, // ✅ price should be Number
      required: true
    },
    description: {
      type: String
    },
    category: [
      {
        type: String,
        enum: ['Veg', 'Non-Veg'] // ✅ consistent with Firm
      }
    ],
    image: {
      type: String
    },
    bestSeller: {
      type: Boolean // ✅ better than String
    },
    firm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Firm',
      required: true
    }
  },
  { timestamps: true }
);

// ✅ PREVENT OverwriteModelError
module.exports =
  mongoose.models.Product || mongoose.model('Product', productSchema);
