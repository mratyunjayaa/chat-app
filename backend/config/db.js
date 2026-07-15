const mongoose = require('mongoose');

const connectDB = async () => {
    // 1. Defend against missing or malicious environment variables
    const dbUri = process.env.MONGODB_URI;
    
    if (!dbUri || typeof dbUri !== 'string') {
        console.error('\x1b[41m\x1b[37m[CRITICAL SECURITY ERROR]\x1b[0m MONGODB_URI is undefined or invalid. Connection aborted.');
        process.exit(1);
    }

    try {
        console.log('\x1b[36m%s\x1b[0m', '[DATABASE] Attempting real-time handshake with MongoDB cluster...');
        
        // 2. Establish connection with secure structural parameters
        await mongoose.connect(dbUri);
        
        // ANSI colored terminal output: bright green text for success notifications
        console.log('\x1b[32m%s\x1b[0m', '█████████████████████████████████████████████');
        console.log('\x1b[32m%s\x1b[0m', ' SUCCESS: MongoDB Data Layer Connected Successfully! ');
        console.log('\x1b[32m%s\x1b[0m', '█████████████████████████████████████████████');

    } catch (error) {
        // ANSI colored terminal output: bright red text block highlighting operational failures
        console.error('\x1b[31m%s\x1b[0m', '█████████████████████████████████████████████');
        console.error('\x1b[31m%s\x1b[0m', ' FAILURE: MongoDB Connection Pipeline Shattered!');
        console.error('\x1b[33m%s\x1b[0m', ` REASON:  ${error.message}`);
        console.error('\x1b[31m%s\x1b[0m', '█████████████████████████████████████████████');
        
        // Immediately terminate server engine thread to prevent raw unhandled process states
        process.exit(1);
    }
};

module.exports = connectDB;