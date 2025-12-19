
const mongoose = require('mongoose');
const firmSchema = new mongoose.Schema({
  firmname: {
    type: String,
    required: true,
    unique: true
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
  vendors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vender'
    }
  ],
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  ]
});

// ✅ PREVENT OverwriteModelError
module.exports =
  mongoose.models.Firm || mongoose.model('Firm', firmSchema);