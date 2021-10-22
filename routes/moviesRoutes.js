const express = require('express')
const router = express.Router()
const Validators = require('../middleware/validations')

const controllers = require('../controllers/moviesControllers')

router.get('/', controllers.list)

router.get('/:id', Validators.getByID, controllers.searchById)

router.post('/', Validators.moviesPost, controllers.add)

router.delete('/:id', Validators.getByID, controllers.deleteById)

router.put('/:id', Validators.moviesUpdate, controllers.updateById)

router.put('/:idMovie/characters/:idCharacter', controllers.addCharacter)

module.exports = router