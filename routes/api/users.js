const router = require("express").Router();
const usersController = require("../../controllers/usersController");
const isUserLoggedIn = require("../../config/middleware/isUserLoggedIn");

// Matches with "/api/users"
router.route("/")
  .get(isUserLoggedIn, usersController.findAll)
  // .post(isUserLoggedIn, userController.create);

// Matches with "/api/users/:id"
// router
//   .route("/:id")
//   .get(isUserLoggedIn, userController.findById)
//   .put(isUserLoggedIn, userController.update)
//   .delete(isUserLoggedIn, userController.remove);

module.exports = router;
