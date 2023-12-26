const express = require('express');
const app = express();

// Custom middleware to check if it's working hours
const workingHours = (req, res, next) => {
  const date = new Date();
  const dayOfWeek = date.getDay();
  const hour = date.getHours();

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 17) {
    next(); // Continue to the next middleware or route handler
  } else {
    res.send('Sorry, the website is only available during working hours (Monday to Friday, 9 to 17).');
  }
};

app.use(express.static('public')); // Serve static files like CSS

// Middleware to check working hours for all routes
app.use(workingHours);

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/home.html');
});

app.get('/services', (req, res) => {
  res.sendFile(__dirname + '/views/services.html');
});

app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/views/contact.html');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
