const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const googleRoutes = require("./google");

router.use("/api", apiRoutes);
router.use("/google", googleRoutes);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});


module.exports = router;
