const functions = require("firebase-functions");

exports.helloFunction = functions.https.onRequest((request, response) => {
  response.json("Hello from Firebase!");
});
