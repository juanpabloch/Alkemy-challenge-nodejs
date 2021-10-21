const express = require('express')
const router = express.Router()

const Validators = require('../middleware')
const controllers = require('../controllers/charactersControllers')

router.get('/', controllers.list)
 
 router.get('/:id', Validators.idValidators, controllers.searchById)
 
 router.post('/', Validators.charactersBodyValidators, controllers.add)
 
 router.delete('/:id', Validators.idValidators, controllers.deleteById)
 
 router.put('/:id', [Validators.idValidators], controllers.updateById)

router.put('/:idCharacter/movies/:idMovie', controllers.addMovie)

module.exports = router