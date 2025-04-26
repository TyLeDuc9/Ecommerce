const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.SellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });
            res.cookie('sellerToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return res.json({ success: true, message: 'Loggeg In' });

        } else {
            return res.json({ success: false, message: 'Invalid' })
        }
    } catch (err) {
        console.log(err.message);
        res.json({ success: false, message: err.message });
    }
}
exports.IsSellerAuth = async (req, res) => {
    try {
        
        return res.json({ success: true})
    } catch (err) {
        console.log(err.message)
        res.json({ success: false, message: err.message })
    }

}

exports.SellerLogout = async (req, res) => {
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