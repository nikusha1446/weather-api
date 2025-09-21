import express from 'express';
import weatherRoute from './routes/weatherRoute.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { closeCache, initializeCache } from './services/cacheService.js';

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());

// Routes
app.use('/api/v1/weather', weatherRoute);

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Initialize Redis and start server
const start = async () => {
  await initializeCache();

  const server = app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });

  process.on('SIGTERM', async () => {
    await closeCache();
    server.close(() => {
      process.exit(0);
    });
  });

  process.on('SIGINT', async () => {
    await closeCache();
    server.close(() => {
      process.exit(0);
    });
  });
};

start().catch(console.error);
