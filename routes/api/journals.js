const router = require("express").Router();
const journalsController = require("../../controllers/journalsController");

// Matches with "/api/books"
router.route("/")
  .get(journalsController.findAll)
  .post(journalsController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(journalsController.findById)
  .put(journalsController.update)
  .delete(journalsController.remove);

module.exports = router;
