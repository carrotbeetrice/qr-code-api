const router = require("express").Router();
const { StatusCodes } = require("http-status-codes");
const { qrDataQueries } = require("../queries");

// Search by title
router.get("/:title", async (req, res) => {
  const data = await qrDataQueries.findOne(req.params.title);
  if (data) {
    try {
      data.data = JSON.parse(data.data);
      return res.send(data);
    } catch (e) {
      return res.send(data);
    }
  } else {
    return res.sendStatus(StatusCodes.NOT_FOUND);
  }
});

// // Search all documents
// router.get("/", async (req, res) => {
//   const data = await qrDataQueries.findAll();
//   return res.send(data);
// });

module.exports = router;
