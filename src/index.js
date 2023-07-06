const express = require('express');
const rateLimit = require('express-rate-limit');
const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 3 requests per `window` (here, per 15 minutes)
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(limiter);

app.use(
  '/flightsService',
  createProxyMiddleware({
    target: ServerConfig.FLIGHT_SERVICE,
    changeOrigin: true,
    pathRewrite: { '^/flightsService': '/' },
  })
);
app.use(
  '/bookingService',
  createProxyMiddleware({
    target: ServerConfig.BOOKING_SERVICE,
    changeOrigin: true,
    pathRewrite: { '^/bookingService': '/' },
  })
);
// app.get('/api/v1/blogs', (req, res) => {});
// app.post('/api/v1/blogs', (req, res) => {});
// app.put('/api/v1/blogs', (req, res) => {});
// app.delete('/api/v1/blogs', (req, res) => {});

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
  console.log(`Successfully started the sever on PORT : ${ServerConfig.PORT}`);
});

// cmd "/C TASKKILL /IM node.exe /F"
