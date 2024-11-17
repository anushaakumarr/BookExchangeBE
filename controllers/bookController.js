const Book = require('../models/Book');

exports.addBook = async (req, res) => {
  try {
    const book = new Book({ ...req.body, owner_id: req.user.id });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: 'Error adding book' });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find({ availability: true }).populate('owner_id', 'name email');
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching books' });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findOneAndUpdate({ book_id: id, owner_id: req.user.id }, req.body, {
      new: true,
    });
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Error updating book' });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findOneAndDelete({ book_id: id, owner_id: req.user.id });
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting book' });
  }
};

exports.searchBooks = async (req, res) => {
  try {
    const { title, author, genre, availability, location } = req.query;

    // Build dynamic query based on filters
    const query = {};
    if (title) query.title = { $regex: title, $options: 'i' }; // Case-insensitive regex
    if (author) query.author = { $regex: author, $options: 'i' };
    if (genre) query.genre = genre;
    if (availability) query.availability = availability === 'true';
    if (location) query.location = { $regex: location, $options: 'i' }; // Optional location field

    const books = await Book.find(query).populate('owner_id', 'name email');
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching search results' });
  }
};