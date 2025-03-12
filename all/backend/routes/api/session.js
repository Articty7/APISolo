// backend/routes/api/session.js
const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors,
];

// Log in
router.post("/", validateLogin, async (req, res, next) => {
    const { credential, password } = req.body;  // Destructure credential and password from the request body

    const user = await User.unscoped().findOne({ // Query the database for a user with the given credential
        where: {
            [Op.or]: {
                username: credential,
                email: credential,
            },
        }
    });

    // If no user is found, return an error
    if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
        //const err = new Error("Login failed");
        //err.status = 401;
        //err.title = "Login failed";
        const err= { message: "Invalid credentials" };
        return res.status(401).json(err);
    }

    // If a user is found, call the setTokenCookie function and return the user
    const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
        user: safeUser
    });
});

// Restore session user
router.get("/", (req, res) => {
    const { user } = req;
    if (user) {
        const safeUser = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          username: user.username,
        };
        return res.json({
          user: safeUser
        });
    } else return res.json({ user: null });
});

// Log out
router.delete("/", (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
);

module.exports = router;
