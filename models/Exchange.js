const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const exchangeSchema = new mongoose.Schema({
  exchange_id: { type: String, default: uuidv4, unique: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  book_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected', 'modified'], default: 'pending' },
  terms: {
    deliveryMethod: { type: String },
    exchangeDuration: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

module.exports = mongoose.model('Exchange', exchangeSchema);
