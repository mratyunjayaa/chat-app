const Message = require('../models/message');

exports.getChatHistory = async (req, res) => {
    try {
        const messages = await Message.find().sort({ timestamp: 1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
};

exports.sendMessage = async (req, res) => {
    try {
        const { username, text } = req.body;
        if (!username || !text) {
            return res.status(400).json({ error: 'Username and text are required' });
        }
        const newMessage = new Message({ username, text });
        await newMessage.save();
        
        // Return message to sender via HTTP (Socket handles broadcasting elsewhere)
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save message' });
    }
};