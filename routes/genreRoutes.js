const express = require('express')
const router = express.Router()
const Validators = require('../middleware/validations')

const controllers = require('../controllers/genreControllers')

router.get('/', controllers.list)

router.get('/:id', Validators.getByID, controllers.searchById)

router.post('/', Validators.genrePost, controllers.add)

router.delete('/:id', Validators.getByID, controllers.deleteById)

router.put('/:id', Validators.genreUpdate, controllers.updateById)

module.exports = router