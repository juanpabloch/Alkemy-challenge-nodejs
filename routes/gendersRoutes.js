const express = require('express')
const router = express.Router()
const Validators = require('../middleware')

const controllers = require('../controllers/genderControllers')

router.get('/', controllers.list)

router.get('/:id', Validators.idValidators, controllers.searchById)

router.post('/', Validators.genderValidators, controllers.add)

router.delete('/:id', Validators.idValidators, controllers.deleteById)

router.put('/:id', [Validators.idValidators], controllers.updateById)

module.exports = router