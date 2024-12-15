const express = require("express");
const router = express.Router();
const userRoutes = require("./user");
const groceryRoutes = require("./grocery");
const { authentication } = require('../middlewares/auth');

router.use('/users', userRoutes);
router.use('/groceries', authentication, groceryRoutes);

module.exports = router;