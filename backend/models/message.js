const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: [true, 'Username field is strictly mandatory'],
        trim: true,
        maxlength: [50, 'Username cannot exceed 50 characters']
    },
    text: { 
        type: String, 
        required: [true, 'Message text content is strictly mandatory'],
        trim: true,
        maxlength: [5000, 'Message body cannot exceed 5000 characters']
    },
    timestamp: { 
        type: Date, 
        default: Date.now,
        index: true // 1. Multi-user optimization: Speeds up historical chronological sorting (.sort({ timestamp: 1 }))
    }
}, {
    versionKey: false // 2. Removes the unnecessary '__v' tracking attribute from the database documents
});

// 3. Prevent collection performance degradation by creating a compound index
// Optimize filtering by username while maintaining strict chronological sorting order
MessageSchema.index({ username: 1, timestamp: 1 });

module.exports = mongoose.model('Message', MessageSchema);