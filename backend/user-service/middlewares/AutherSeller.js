const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.autherSeller = async (req, res, next) => {
    const { sellerToken } = req.cookies;
    if (!sellerToken) {
        return res.json({ success: false, message: 'Not authorized' })
    }
    try {
        const tokenDecode = jwt.verify(sellerToken, process.env.SELLER_EMAIL)
        if (tokenDecode.email) {
            next();
        } else {
            return res.json({ success: false, message: 'not authorized' })
        }


    } catch (err) {
        res.json({ success: false, message: err.message })
    }
}
