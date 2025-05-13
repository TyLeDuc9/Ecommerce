require('dotenv').config(); 
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
console.log("JWT Secret:", JWT_SECRET); 


const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Authorization header:", authHeader);
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);  // Đảm bảo rằng decoded được khai báo ở đây
    console.log("✅ Decoded JWT:", decoded);
    req.user = decoded;  // Gán giá trị decoded cho req.user
    next();
  } catch (err) {
    console.error("JWT Verify Error:", err.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Middleware: Kiểm tra vai trò người dùng
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied: insufficient permissions' });
    }
    next();
  };
};

module.exports = { authenticate, authorizeRoles };
