const express = require('express');
const cors = require('cors');
const app = express();

// Serve static files (HTML, CSS, JS) from the 'public' directory
app.use(express.static('public'));
app.use(cors());

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
