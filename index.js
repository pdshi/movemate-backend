require('dotenv').config();
const express = require('express');

const PORT = process.env.PORT || 3030;

const app = express();

// Parse URL-encoded data in the request body
app.use(express.urlencoded({ extended: true }));

app.use('/auth', require('./src/routes/authRoutes'));
app.use('/userdata', require('./src/routes/userDataRoutes'));
app.use('/userhistory', require('./src/routes/userHistoryRoutes'));
app.use('/userreps', require('./src/routes/userRepsRoutes'));
app.use('/workout', require('./src/routes/workoutDataRoutes'));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})