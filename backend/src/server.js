const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const { connectionPool } = require('./utils/database');

app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// })


app.get('/', (req, res) => {
    // Test the database connection with a simple query
    connectionPool.query('SELECT 1', (error, results, fields) => {
        if (error) {
            console.error('Database connection error:', error);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Database connection successful');
            res.send('Hello World!');
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});