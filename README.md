# Weather API

A Node.js weather API that fetches real-time weather data with caching and rate limiting.

## ✨ Features

- Real-time weather data from Visual Crossing API
- Redis caching with 12-hour expiration
- Rate limiting (100 requests per hour per IP)
- Clean REST API with JSON responses
- Error handling and graceful server shutdown

## 🚀 Quick Start

### Prerequisites

- Node.js (20.6+)
- Redis server

### Installation

1. Clone the repository
```bash
git clone https://github.com/nikusha1446/weather-api.git
cd weather-api
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
WEATHER_API_KEY=your_visual_crossing_api_key_here
REDIS_URL=redis://localhost:6379
PORT=3000
CACHE_EXPIRATION=43200
```

4. Start Redis server
```bash
redis-server
```

5. Start the application
```bash
npm start
```

## 💻 API Usage

### Get Weather Data

```
GET /api/v1/weather/:city
```

**Example Request:**
```bash
curl http://localhost:3000/api/v1/weather/london
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "location": "London",
    "coordinates": {
      "latitude": 51.5072,
      "longitude": -0.1275
    },
    "temperature": 15.3,
    "feelsLike": 15.2,
    "humidity": 70.2,
    "description": "Partially cloudy",
    "windSpeed": 13.3,
    "windDirection": 228,
    "pressure": 1006,
    "visibility": 10,
    "uvIndex": 0,
    "cloudCover": 70.1,
    "sunrise": "06:43:38",
    "sunset": "19:03:14",
    "timezone": "Europe/London",
    "icon": "partly-cloudy-day",    
  },
  "cached": false
}
```

## 🛑 Error Responses

### Rate Limit Exceeded
```json
{
  "success": false,
  "error": "Rate Limit Exceeded",
  "message": "Too many requests from this IP, please try again later.",
  "retryAfter": "1 hour"
}
```

### Invalid City
```json
{
  "success": false,
  "error": "Error: invalid city name: invalidcity"
}
```

### Route Not Found
```json
{
  "success": false,
  "error": "Not Found",
  "message": "The requested endpoint does not exist",
}
```

## 📦 Dependencies

- **express** - Web framework
- **axios** - HTTP client for API requests
- **redis** - Redis client for caching
- **express-rate-limit** - Rate limiting middleware

## 🔑 Getting Visual Crossing API Key

1. Visit [Visual Crossing Weather API](https://www.visualcrossing.com/weather-api)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Add it to your `.env` file

## 📄 License

ISC
