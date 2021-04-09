const router = require("express").Router();
const journalRoutes = require("./journals");

// Thammarak for user
const userRoutes = require("./users");



// Journal routes
router.use("/journals", journalRoutes);

// Thammarak for user
router.use("/users", userRoutes);


module.exports = router;
