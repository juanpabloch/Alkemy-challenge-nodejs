const express = require('express')
const router = express.Router()

const Validators = require('../middleware/validations')
const controllers = require('../controllers/charactersControllers')

router.get('/', controllers.list)
 
 router.get('/:id', Validators.getByID, controllers.searchById)
 
 router.post('/', Validators.charactersPost, controllers.add)
 
 router.delete('/:id', Validators.getByID, controllers.deleteById)
 
 router.put('/:id', Validators.charactersUpdate, controllers.updateById)

router.put('/:idCharacter/movies/:idMovie', controllers.addMovie)

module.exports = router