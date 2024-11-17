const Exchange = require('../models/Exchange');

exports.sendRequest = async (req, res) => {
  try {
    const { receiver, book_id, terms } = req.body;

    const exchange = new Exchange({
      sender: req.user.id,
      receiver,
      book_id,
      terms,
    });

    await exchange.save();
    res.status(201).json(exchange);
  } catch (error) {
    res.status(500).json({ error: 'Error sending exchange request' });
  }
};

exports.updateRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, terms } = req.body;

    const exchange = await Exchange.findById(id);
    if (!exchange) return res.status(404).json({ error: 'Exchange request not found' });

    if (exchange.receiver.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to modify this request' });
    }

    exchange.status = status || exchange.status;
    exchange.terms = terms || exchange.terms;
    exchange.updatedAt = Date.now();

    await exchange.save();
    res.json(exchange);
  } catch (error) {
    res.status(500).json({ error: 'Error updating exchange request' });
  }
};

exports.getUserTransactions = async (req, res) => {
  try {
    const exchanges = await Exchange.find({ $or: [{ sender: req.user.id }, { receiver: req.user.id }] })
      .populate('book_id')
      .populate('receiver', 'name')
      .populate('sender', 'name');
    res.json(exchanges);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching transaction history' });
  }
};
