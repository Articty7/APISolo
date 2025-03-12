// backend/routes/api/users.js
const express = require('express');
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

//Sign Up
router.post("/", validateSignup, async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;         // Destructure email, password, and username from the request body
    const hashedPassword = bcrypt.hashSync(password);       // Hash the password


const existingUserByEmail = await User.findOne({where: {email}});
const existingUserByUsername = await User.findOne({where: {username}});

const errors={};
if (existingUserByEmail){
  errors.email = "User with that email already exists";
}
if (existingUserByUsername){
  errors.username = "User with that username already exists";
}

if (Object.keys(errors).length > 0){

  return res.status(500).json({message: "User already exists",
    errors: errors
  });
}



    const user = await User.create({                        // Create a new user in the database
        firstName,
        lastName,
        username,
        email,
        hashedPassword,
    });

    const safeUser = {                                      // Create a safe user object
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
    };

    await setTokenCookie(res, user);                        // Call the setTokenCookie function

    return res.status(201).json({                                       // Return the user
        user: safeUser
    });
});



module.exports = router;
