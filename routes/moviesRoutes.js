const express = require('express')
const router = express.Router()
const Validators = require('../middleware')

const controllers = require('../controllers/moviesControllers')

router.get('/', controllers.list)

router.get('/:id', Validators.idValidators, controllers.searchById)

router.post('/', Validators.moviesBodyValidators, controllers.add)

router.delete('/:id', Validators.idValidators, controllers.deleteById)

router.put('/:id', Validators.idValidators, controllers.updateById)

router.put('/:idMovie/characters/:idCharacter', controllers.addCharacter)

module.exports = router