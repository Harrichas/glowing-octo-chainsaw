const router = require("express").Router();
const journalRoutes = require("./journals");

// Journal routes
router.use("/journals", journalRoutes);

module.exports = router;
