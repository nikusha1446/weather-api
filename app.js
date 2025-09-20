import express from 'express';
import weatherRoutes from './routes/weatherRoute';

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());

// Routes
app.use('/weather', weatherRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
