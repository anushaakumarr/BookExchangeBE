const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
  try {
    const { receiver, content, exchange } = req.body;
    const message = new Message({ sender: req.user.userId, receiver, content, exchange });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
};

exports.getMessagesByExchange = async (req, res) => {
  try {
    const messages = await Message.find({ exchange: req.params.exchangeId }).populate('sender receiver', 'name');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};
