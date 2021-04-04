const router = require("express").Router();
const journalsController = require("../../controllers/journalsController");
const isUserLoggedIn = require("../../config/middleware/isUserLoggedIn");

// Matches with "/api/journals"
router.route("/")
  .get(isUserLoggedIn, journalsController.findAll)
  .post(isUserLoggedIn, journalsController.create);

// Matches with "/api/journals/:id"
router
  .route("/:id")
  .get(isUserLoggedIn, journalsController.findById)
  .put(isUserLoggedIn, journalsController.update)
  .delete(isUserLoggedIn, journalsController.remove);

module.exports = router;
