// order.model.js
const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema(
  {
    category: { type: String, required: true }, // e.g., "Dishes", "Coffee"
    name: { type: String, required: true },     // e.g., "Paneer Butter Masala"
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 }, // unit price
    special: { type: String, default: '' }          // special instructions for this item
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true, trim: true },
    contact: { type: String, trim: true }, // phone or contact
    items: { type: [ItemSchema], required: true, validate: v => Array.isArray(v) && v.length > 0 },
    totalAmount: { type: Number, required: true, min: 0 },
    paymentMethod: {
      type: String,
      enum: ['cash', 'card', 'online'],
      default: 'cash'
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'preparing', 'ready', 'completed', 'cancelled'],
      default: 'pending'
    },
    notes: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
