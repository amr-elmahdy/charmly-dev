const functions = require('firebase-functions');

exports.hello = functions.https.onRequest((req, res) => {
  res.setHeader('Content-Type', 'image/svg+xml');
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="50">
      <rect width="100%" height="100%" fill="#4CAF50" rx="10" />
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" 
            font-family="Arial" font-size="20" fill="white">
        Hello API!
      </text>
    </svg>
  `;
  res.status(200).send(svg);
});