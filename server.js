const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

// Serve static files (HTML, CSS, JS) from the 'public' directory
app.use(express.static('public'));

// Define proxy middleware to forward requests to the Rasa server
const rasaProxy = createProxyMiddleware({
  target: 'http://localhost:5005',
  changeOrigin: true, // Needed for virtual hosted sites
  ws: true, // Proxy websockets
});

// Use the proxy middleware
app.use('/rasa', rasaProxy); // Route requests to /rasa to the Rasa server

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
