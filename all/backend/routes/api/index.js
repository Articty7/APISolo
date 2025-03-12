// backend/routes/api/index.js
const router = require('express').Router();
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
router.use(restoreUser);

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/session', require('./session.js'));
router.use('/users', require('./users.js'));
router.use('/spots', require('./spots.js'));
router.use('/bookings', require('./bookings.js'));
router.use('/review-images', require('./review-images.js'));
router.use('/reviews', require('./reviews.js'));
router.use('/spot-images', require('./spot-images.js'));

// test route
// router.post('/test', function(req, res) {
//   res.json({ requestBody: req.body });
// });

module.exports = router;
