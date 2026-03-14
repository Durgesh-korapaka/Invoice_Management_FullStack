const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // 1️⃣ Get token from header
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    // 2️⃣ Extract token (Bearer TOKEN)
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token format invalid" });
    }

    // 3️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Attach user info to request
    req.user = decoded;

    // 5️⃣ Go to next function (route)
    next();

  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;