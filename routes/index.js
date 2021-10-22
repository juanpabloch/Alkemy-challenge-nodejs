const express = require('express');
const router = express.Router();
const tokenAuth = require('../middleware/auth')

//rutas
const gendersRoutes = require('./gendersRoutes');
const moviesRoutes = require('./moviesRoutes');
const charactersRoutes = require('./charactersRoutes');
const usersRoutes = require('./userRoutes');

router.get('/', (req, res)=>{
    res.status(200).json({mensaje: "welcome"})
})

router.use("/genders", tokenAuth, gendersRoutes)
router.use("/movies", tokenAuth, moviesRoutes)
router.use("/characters", tokenAuth, charactersRoutes)
router.use("/auth", usersRoutes)

module.exports = router