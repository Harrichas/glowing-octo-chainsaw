const router = require("express").Router();
const journalsController = require("../../controllers/journalsController");

// Matches with "/api/journals"
router.route("/")
  .get(journalsController.findAll)
  .post(journalsController.create);

// Matches with "/api/journals/:id"
router
  .route("/:id")
  .get(journalsController.findById)
  .put(journalsController.update)
  .delete(journalsController.remove);

module.exports = router;
