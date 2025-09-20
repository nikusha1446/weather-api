import express from 'express';
import weatherRoute from './routes/weatherRoute.js';

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());

// Routes
app.use('/api/v1/weather', weatherRoute);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
