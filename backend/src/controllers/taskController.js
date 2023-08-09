const pool = require('../utils/database');

const createTask = async (req, res) => {
    const { title, description } = res.body;

    try{
        const [result] = await pool.query(
            'INSERT INTO tasks (title, description) VALUES (?, ?)', 
            [title, description]
        );
        return res.status(201).json({ id: result.insertId, title, description});

    } catch (error) {
        return res.status(500).json({ error: 'Failed to create task.'});
    }
};

module.exports = {
    createTask,
    // Add more controller functions as needed.
};