const Data = require(`../model/waitList`);
const jwt = require(`jsonwebtoken`);
const { UnauthenticatedError } = require(`../error`);

const auth = async (req, res, next) => {
  // Check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith(`Bearer `)) {
    throw new UnauthenticatedError(`Authentication invalid`);
  }
  const token = authHeader.split(` `)[1];

  try {
    // Verify JWT token
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.Data = { DataID: payload.DataID, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = auth;
