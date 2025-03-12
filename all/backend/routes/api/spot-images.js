const express = require('express');
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { SpotImage, Spot } = require('../../db/models');

const router = express.Router();

router.delete("/:imageId", async (req, res, next) => {
    const { user } = req;
    if (user) {
        const spotImage = await SpotImage.findByPk(req.params.imageId);
        if (spotImage) {
            const spot = await Spot.findByPk(spotImage.spotId);
            if (user.id === spot.ownerId) {
                await spotImage.destroy();
                return res.json({ message: "Successfully deleted" });
            } else {
                res.statusCode = 403;
                return res.json({ message: "Forbidden: Spot must belong to the current user"});
            }
        } else {
            res.statusCode = 404;
            return res.json({ message: "Spot Image couldn't be found" });
        }
    } else {
        res.statusCode = 401;
        return res.json({ message: "Authentication required"});
    }
});

module.exports = router;