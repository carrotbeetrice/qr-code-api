const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { accessTokenSecret } = require("../config").jwt;
const { StatusCodes } = require("http-status-codes");

// Middleware for protected routes
router.use((req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    if (authHeader.startsWith("Bearer")) {
      const token = authHeader.split(" ")[1];

      jwt.verify(token, accessTokenSecret, (err, decoded) => {
        if (err) return res.status(StatusCodes.BAD_REQUEST).send(err);
        else {
          req.user = parseInt(decoded.id);
          next();
        }
      });
    }
  } else {
    res.sendStatus(StatusCodes.UNAUTHORIZED);
  }
});

router.get("/", (req, res) => {
  return res.json({
    user: req.user,
    message: "Allowed access to protected route",
  });
});

module.exports = router;
