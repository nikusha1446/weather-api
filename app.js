import express from 'express';
import weatherRoute from './routes/weatherRoute.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());

// Routes
app.use('/api/v1/weather', weatherRoute);

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
