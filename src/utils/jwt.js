const jwt = require("jsonwebtoken");
const {
  accessTokenSecret,
  refreshTokenSecret,
  maxAccessTokenAge,
  maxRefreshTokenAge,
} = require("../config").jwt;

const generateTokens = (payload) => {
  let accessToken = jwt.sign(payload, accessTokenSecret, {
    expiresIn: maxAccessTokenAge,
  });
  let refreshToken = jwt.sign(payload, refreshTokenSecret, {
    expiresIn: maxRefreshTokenAge,
  });

  return { accessToken, refreshToken };
};

const newAccessToken = (refreshToken) => {
  let { id, username } = jwt.verify(refreshToken, refreshTokenSecret);
  let newAccessToken = jwt.sign({ id, username }, accessTokenSecret, {
    expiresIn: maxAccessTokenAge,
  });
  return newAccessToken;
};

module.exports = { generateTokens, newAccessToken };
