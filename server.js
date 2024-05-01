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
const EventEmitter = require('events');
const expressLayouts = require('express-ejs-layouts');
const path = require("path");





// Define the directory where your static files are located
const publicDirectoryPath = path.join(__dirname, 'public');

// Serve static files from the 'public' directory
app.use(express.static(publicDirectoryPath));

// Define a function to check if a string is a valid URL
function isValidUrl(url) {
  // Implement your validation logic here
  // For example, you can use regular expressions or a dedicated library
  // This is a basic example:
  return url && (url.startsWith('http://') || url.startsWith('https://'));
}

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

//end add
/* ***************************
 * View Engine and Templates *
 *****************************/
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout"); // not at views root

/* ***************************
 * Routes *
 *****************************/
app.use(static);

// Add index route handler here
app.get("/", function(req, res) {
  res.render("index", { title: "Home" });
});

app.get('/checkerboard', (req, res) => {
  res.render('checkerboard', { title: 'Checkerboard' });
});

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
