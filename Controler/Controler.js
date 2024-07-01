const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const usermodel = require('../Model/Model')



exports.login = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        const existingUser = await usermodel.findOne({ Email });
        if (!existingUser) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const isPasswordValid = await bcrypt.compare(Password, existingUser.Password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: existingUser._id, Email: existingUser.Email }, process.env.SECRET_KEY, { expiresIn: '1h' });

        res.json({ message: "Login successful", data: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


