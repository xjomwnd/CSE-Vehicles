/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")

// IMAGES
// Import any necessary modules for validation and sanitization

app.get('/', (req, res) => {
  // Validate and sanitize image URL from req.query
  const imageUrl = validateAndSanitizeImageUrl(req.query.imageUrl);

  // Render the template with the sanitized image URL
  res.render('index', { imageUrl: imageUrl });
});

// Define a function to validate and sanitize the image URL
function validateAndSanitizeImageUrl(imageUrl) {
  // Implement your validation and sanitization logic here
  // For example, you can use a library like validator.js for validation
  // and sanitize-html to sanitize the URL
  
  // Here's a basic example:
  if (isValidUrl(imageUrl)) {
    return imageUrl;
  } else {
    return '/default-image.jpg'; // Provide a default image or handle the error accordingly
  }
}

/* ***********************
 * Routes
 *************************/
app.use(static)

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
