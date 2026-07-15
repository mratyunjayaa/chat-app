const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// 1. Basic security middleware wrapper (Simulated standard Rate Limiter context)
// For deep production environments, use 'express-rate-limit' from npm
const apiRateLimiter = (maxRequestsPerMinute) => {
    const ipCache = new Map();
    
    return (req, res, next) => {
        const clientIp = req.ip || req.headers['x-forwarded-for'] || 'unknown';
        const currentTime = Date.now();
        
        if (!ipCache.has(clientIp)) {
            ipCache.set(clientIp, []);
        }
        
        // Filter out timestamp records older than 1 minute
        const requestTimestamps = ipCache.get(clientIp).filter(time => currentTime - time < 60000);
        
        if (requestTimestamps.length >= maxRequestsPerMinute) {
            console.warn('\x1b[33m%s\x1b[0m', `[SECURITY ALERT] Rate limit triggered by IP: ${clientIp}`);
            return res.status(429).json({ 
                error: 'Too many API operations. Please throttle your traffic down and try again.' 
            });
        }
        
        requestTimestamps.push(currentTime);
        ipCache.set(clientIp, requestTimestamps);
        next();
    };
};

// 2. Map routes to their controllers with customized rate limits
// Allow normal history pulling but strictly regulate incoming post operations
router.get('/', apiRateLimiter(60), messageController.getChatHistory); // Max 60 page loads/history syncs per minute
router.post('/', apiRateLimiter(30), messageController.sendMessage);   // Max 30 text dispatches per minute

module.exports = router;