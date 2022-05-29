const router = require("express").Router();
const { StatusCodes } = require("http-status-codes");
const { generateTokens, newAccessToken } = require("../utils/jwt");
const { userQueries } = require("../queries");

// User login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await userQueries.login(email, password);
    if (!result) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send("Invalid email and/or password");
    }

    const { accessToken, refreshToken } = generateTokens({
      id: result._id,
    });

    return res.send({ accessToken, refreshToken });
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
  }
});

// Generate new access token for user
router.get("/token", (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    if (authHeader.startsWith("Bearer")) {
      const refreshToken = authHeader.split(" ")[1];
      const accessToken = newAccessToken(refreshToken);

      if (accessToken) {
        res.send(accessToken);
      } else {
        res.sendStatus(StatusCodes.UNAUTHORIZED);
      }
    } else {
      res.status(StatusCodes.BAD_REQUEST).send("Refresh token missing");
    }
  } else {
    res.status(StatusCodes.BAD_REQUEST).send("Refresh token missing");
  }
});

module.exports = router;
