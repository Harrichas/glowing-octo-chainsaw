const router = require("express").Router();
const journalRoutes = require("./journals");

// Book routes
router.use("/journals", journalRoutes);

module.exports = router;
