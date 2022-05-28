const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { accessTokenSecret } = require("../config").jwt;
const { StatusCodes } = require("http-status-codes");
const multer = require("multer");
const Jimp = require("jimp");
const jsQR = require("jsqr");
const { userQueries, qrDataQueries } = require("../queries");
const { nanoid } = require("nanoid");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware for protected routes
router.use(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    if (authHeader.startsWith("Bearer")) {
      const token = authHeader.split(" ")[1];
      try {
        const { id } = jwt.verify(token, accessTokenSecret);
        const userExists = await userQueries.exists(id);
        if (userExists) {
          req.user = id;
          next();
        } else {
          return res.status(StatusCodes.UNAUTHORIZED);
        }
      } catch (e) {
        console.log(e);
        return res.sendStatus(StatusCodes.BAD_REQUEST);
      }
    } else {
      return res.sendStatus(StatusCodes.FORBIDDEN);
    }
  } else {
    return res.sendStatus(StatusCodes.FORBIDDEN);
  }
});

// Upload data via QR code
router.post("/", upload.single("qr-code"), async (req, res) => {
  if (!req.file) {
    return res.status(StatusCodes.BAD_REQUEST).send("Missing QR code file.");
  }

  try {
    const img = await Jimp.read(req.file.buffer);
    const qrCodeImageArray = new Uint8ClampedArray(img.bitmap.data.buffer);
    const result = jsQR(qrCodeImageArray, img.bitmap.height, img.bitmap.width);
    if (!result) {
      return res.status(StatusCodes.BAD_REQUEST).send("Cannot parse QR code.");
    }

    let data = null;
    // Attempt to parse as JSON
    try {
      data = JSON.parse(result.data);
    } catch (err) {
      data = result.data;
    }

    // Check for title in request body. Title indicates an update to existing data
    const titleToUpdate = req.body.title;
    if (titleToUpdate) {
      const newDoc = await qrDataQueries.update(titleToUpdate, data, req.user);
      return res.status(StatusCodes.CREATED).send(newDoc);
    } else {
      const title = nanoid(20); // For simplicity, set title a random id for new data
      const newDoc = await qrDataQueries.create(title, data, req.user);
      return res.status(StatusCodes.CREATED).send(newDoc);
    }
  } catch (err) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
  }
});

// Delete data by title
router.delete("/", async (req, res) => {
  const title = req.body.title;
  if (!title) {
    return res.status(StatusCodes.BAD_REQUEST).send("Missing title to delete");
  }

  try {
    // Check if title exists
    const exists = await qrDataQueries.exists(title);
    if (!exists) {
      return res.status(StatusCodes.BAD_REQUEST).send("No such title exists");
    }

    // Perform delete
    const result = await qrDataQueries.delete(title);
    return res.status(StatusCodes.OK).send(result);
  } catch (err) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
  }
});

module.exports = router;
