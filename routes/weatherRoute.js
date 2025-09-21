import express from 'express';
import { getWeatherByCity } from '../controllers/weatherController.js';
import { limiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.use(limiter);

router.get('/:city', getWeatherByCity);

export default router;
