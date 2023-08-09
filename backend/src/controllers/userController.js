const pool = require('../utils/database');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    try{
        const { username, email, password } = res.body;

        const [existingUser] = await pool.query(
            "SELECT * FROM user WHERE email =?", 
            [email]
        );

        if (existingUser.length > 0){
            return res.status(500).json({ error: "Email already used"});
        }

        const hashedPassword = bcrypt.hash(password, 10);
        const [result] = await pool.query(
            'INSERT INT0 users (username, email, password) VALUES (?,?,?)', 
            [username, email, hashedPassword]
        );
        return res.status(201).json({ id: result.insertId, username, email });
    } catch (error) {
        return res.status(500).json({ error: "Failed to Register"});
    };
};

const loginUser = async (req, res) => {
    try{
        const { email, password } = res.body;

        const [user] = await pool.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (user.length === 0){
            return res.status(500).json({ error: "Invalid email or password."})
        }

        const match = await bcrypt.compare(password, user[0].password);

        if (!match) {
            return res.status(401).json({ error: "Invalid email or password"});
        }

        return res.status(200).json({ message: "Login successful"});
    } catch (error) {
        return res.status(500).json({ error: "Failed to login."})
    }
};

module.exports = {
    registerUser,
    loginUser
};

