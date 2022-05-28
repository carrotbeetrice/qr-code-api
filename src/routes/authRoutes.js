const router = require("express").Router();
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { generateTokens, newAccessToken } = require("../utils/jwt");

// User login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await User.findOne({ email, password }).exec();

    if (!result) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send("Invalid email and/or password");
    }

    const { accessToken, refreshToken } = generateTokens({
      id: result.id,
    });

    return res.send({ accessToken, refreshToken });
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
  }
});

// Generate new access token for user
router.get("/token", (req, res) => {
  const authHeader = req.headers.authorization;

  // TODO: Verify refresh token
  if (authHeader) {
    if (authHeader.startsWith("Bearer")) {
      const refreshToken = authHeader.split(" ")[1];
      const accessToken = newAccessToken(refreshToken);

      res.send(accessToken);
    } else {
      res.status(StatusCodes.BAD_REQUEST).send("Refresh token missing");
    }
  } else {
    res.status(StatusCodes.BAD_REQUEST).send("Refresh token missing");
  }
});

module.exports = router;
