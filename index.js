require('dotenv').config();
const express = require('express');

const PORT = process.env.PORT || 3030;

const app = express();

// Parse URL-encoded data in the request body
app.use(express.urlencoded({ extended: true }));

app.use('/auth', require('./routes/authRoutes'));
app.use('/userdata', require('./routes/userDataRoutes'));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})