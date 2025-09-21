import { rateLimit } from 'express-rate-limit';

export const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 100,
  message: {
    success: false,
    error: 'Rate Limit Exceeded',
    message: 'Too many requests from this IP, please try again later.',
    retryAfter: '1 hour',
  },
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});
