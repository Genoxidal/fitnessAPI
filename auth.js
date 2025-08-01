const jwt = require("jsonwebtoken");
const secret = "fitnessTrackerSecret"; // Replace with process.env.JWT_SECRET if desired

module.exports.createAccessToken = (user) => {
  const data = {
    id: user._id,
    email: user.email
  };
  return jwt.sign(data, secret, { expiresIn: '3d' });
};

module.exports.verify = (req, res, next) => {
  let token = req.headers.authorization;

  if (typeof token === "undefined") {
    return res.status(401).send({ auth: "Failed. No Token" });
  } else {
    token = token.slice(7, token.length); // Remove "Bearer "
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        return res.status(401).send({ auth: "Failed", message: err.message });
      } else {
        req.user = decodedToken;
        next();
      }
    });
  }
};