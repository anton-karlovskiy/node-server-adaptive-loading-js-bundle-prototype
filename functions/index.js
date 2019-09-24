const functions = require('firebase-functions');

const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
app.disable('x-powered-by');
app.use(cors());

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.get('/network-memory-considerate-js-loading', (req, res) => {
  const ect = req.headers.ect;
  const deviceMemory = req.headers['device-memory'];
  const MEMORY_LIMIT = 4; // Threshold is 4GB RAM
  const ECT_LIMIT = '4g';
  console.log('[server network-memory-considerate-js-loading request] ECT, Device Memory => ', ect, deviceMemory);
  
  // TODO: As this is a demo, I think it should be easy enough to change these numbers as needed in the future. -> dotenv
  const experienceType = ect === ECT_LIMIT && deviceMemory > MEMORY_LIMIT ? 'heavy' : 'light';
  res.json({experienceType});
});

app.use(express.static(path.join(__dirname, 'build')));

// need to declare a 'catch all' route on your express server 
// that captures all page requests and directs them to the client
// the react-router do the route part
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(
  process.env.PORT || 5000,
  () => {
    console.log(`Frontend start on http://localhost:5000`);
  }
);

exports.app = functions.https.onRequest(app);
