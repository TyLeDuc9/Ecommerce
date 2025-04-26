const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

exports.AutherUser = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.json({ success: false, message: 'Not authorized' })
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        if (tokenDecode.id) {
            req.body.userId = tokenDecode.id;
        } else {
            return res.json({ success: false, message: 'not authorized' })
        }
        next();

    } catch (err) {
        res.json({ success: false, message: err.message })
    }
}
exports.IsAuth = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId).select("-password")
        return res.json({ success: true, user })
    } catch (err) {
        console.log(err.message)
        res.json({ success: false, message: err.message })
    }

}
exports.Logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
        });
        return res.json({ success: true, message: 'Logged Out' })
    } catch (err) {
        console.log(err.message)
        res.json({ success: false, message: err.message })
    }

}