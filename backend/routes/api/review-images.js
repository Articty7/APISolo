const express = require('express');
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { ReviewImage, Review } = require('../../db/models');

const router = express.Router();

router.delete("/:imageId", async (req, res, next) => {
    const { user } = req;
    if (user) {
        const reviewImage = await ReviewImage.findByPk(req.params.imageId);
        if (reviewImage) {
            const review = await Review.findByPk(reviewImage.reviewId);
            if (user.id === review.userId) {
                await reviewImage.destroy();
                return res.json({ message: "Successfully deleted" });
            } else {
                res.statusCode = 403;
                return res.json({ message: "Forbidden: Review must belong to the current user"});
            }
        } else {
            res.statusCode = 404;
            return res.json({ message: "Review Image couldn't be found" });
        }
    } else {
        res.statusCode = 401;
        return res.json({ message: "Authentication required"});
    }
});

module.exports = router;