const express = require('express');
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Review, Spot, User, ReviewImage } = require('../../db/models');

const router = express.Router();

const validateReview = [
  check('review').exists({ checkFalsy: true })
    .withMessage('Review text is required'),
  check('stars').isInt({ min: 1, max: 5 })
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
];

// Add a Review Image
router.post("/:reviewId/images", async (req, res, next) => {
  const { user } = req;
  console.log(user);
  if (user) {
    const reviewId = req.params.reviewId;
    const review = await Review.findByPk(reviewId);
    if (review) {
      if (user.id === review.userId) {
        const reviewImgs = await Review.findAll({
          where: {
            reviewId: reviewId
          }
        });
        if (reviewImgs.length < 10) {
          // Create new Image
          const { url, preview } = req.body;
          const newImage = await ReviewImage.create({
            url,
            preview,
            reviewId: reviewId
          });
        } else {
          res.statusCode = 403;
          return res.json({ message: "Maximum number of images for this resource was reached"});
        }
      } else {
        res.statusCode = 403;
        return res.json({ message: "Forbidden: Review must belong to the current user"})
      }
    } else {
      res.statusCode = 404;
      return res.json({ message: "Review couldn't be found"});
    }
  } else {
    res.statusCode = 401;
    return res.json({ message: "Authentication required"});
  }
})

// Get all Reviews from Current User
router.get("/current", async (req, res, next) => {
  const { user } = req;
  if (user) {
    const reviews = await Review.findAll({
      where: {
        userId: user.id
        }
    });
    const reviewsList = []
    for (let i = 0; i < reviews.length; i++) {
      const spot = await Spot.findByPk(reviews[i].spotId);
      reviewsList[i] = {
        id: reviews[i].id,
        userId: reviews[i].userId,
        spotId: reviews[i].spotId,
        review: reviews[i].review,
        stars: reviews[i].stars,
        createdAt: reviews[i].createdAt,
        updatedAt: reviews[i].updatedAt,
        User: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName
        },
        Spot: {
          id: spot.id,
          ownerId: spot.ownerId,
          address: spot.address,
          city: spot.city,
          state: spot.state,
          country: spot.country,
          lat: spot.lat,
          lng: spot.lng,
          name: spot.name,
          price: spot.price,
          previewImage: spot.previewImage
        }
      };
    }
    return res.json({ Reviews: reviewsList });
  } else {
    res.statusCode = 401;
    return res.json({ message: "Authentication required"});
  }
});

router.put("/:reviewId", validateReview, async (req, res, next) => {
  const { user } = req;
  if (user) {
    const reviewId = req.params.reviewId;
    const review = await Review.findByPk(reviewId);
    if (review) {
      if (user.id === review.userId) {
        const { review, stars } = req.body;
        const updatedReview = await review.update({
          review,
          stars
        });
        return res.json(updatedReview);
      } else {
        res.statusCode = 403;
        return res.json({ message: "Forbidden: Review must belong to the current user"})
      }
    } else {
      res.statusCode = 404;
      return res.json({ message: "Review couldn't be found"});
    }
  } else {
    res.statusCode = 401;
    return res.json({ message: "Authentication required"});
  }
});

router.delete("/:reviewId", async (req, res, next) => {
  const { user } = req;
  if (user) {
    const reviewId = req.params.reviewId;
    const review = await Review.findByPk(reviewId);
    if (review) {
      if (user.id === review.userId) {
        await review.destroy();
        return res.json({ message: "Successfully deleted" });
      } else {
        res.statusCode = 403;
        return res.json({ message: "Forbidden: Review must belong to the current user"})
      }
    } else {
      res.statusCode = 404;
      return res.json({ message: "Review couldn't be found"});
    }
  } else {
    res.statusCode = 401;
    return res.json({ message: "Authentication required"});
  }
});

module.exports = router;