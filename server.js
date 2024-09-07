const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Import auth routes
const passwordResetRoutes = require('./routes/passwordReset');
const authController = require('./controllers/authController');
const path = require('path');
const userRoutes = require('./routes/users');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('public'));

app.use('/api/auth', authRoutes); // Ensure this uses the routes that include the user fetching route
app.use('/api/password-reset', passwordResetRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.redirect('/login.html');
});


app.get('/resetPassword.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'resetPassword.html'));
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
