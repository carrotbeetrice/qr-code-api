const router = require("express").Router();
const { qrDataQueries } = require("../queries");

// Search by title
router.get("/:title", async (req, res) => {
  const data = await qrDataQueries.findOne(req.params.title);
  return res.send(data);
});

// Search all documents
router.get("/", async (req, res) => {
  const data = await qrDataQueries.findAll();
  return res.send(data);
});

module.exports = router;
