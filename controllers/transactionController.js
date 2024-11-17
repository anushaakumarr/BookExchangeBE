const Exchange = require('../models/Exchange');

exports.getTransactionHistory = async (req, res) => {
  try {
    const transactions = await Exchange.find({ $or: [{ sender: req.user.id }, { receiver: req.user.id }] })
      .populate('book_id', 'title author')
      .populate('sender', 'name email')
      .populate('receiver', 'name email')
      .sort({ updatedAt: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching transaction history' });
  }
};

exports.cancelExchange = async (req, res) => {
  try {
    const { id } = req.params;

    const exchange = await Exchange.findById(id);
    if (!exchange) return res.status(404).json({ error: 'Exchange not found' });

    if (exchange.sender.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to cancel this exchange' });
    }

    if (exchange.status !== 'pending') {
      return res.status(400).json({ error: 'Only pending exchanges can be canceled' });
    }

    exchange.status = 'canceled';
    exchange.updatedAt = Date.now();
    await exchange.save();

    res.json({ message: 'Exchange canceled successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error canceling exchange' });
  }
};
