const express = require('express')
const router = express.Router()
const Validators = require('../middleware/validations')

const controllers = require('../controllers/genderControllers')

router.get('/', controllers.list)

router.get('/:id', Validators.getByID, controllers.searchById)

router.post('/', Validators.genderPost, controllers.add)

router.delete('/:id', Validators.getByID, controllers.deleteById)

router.put('/:id', Validators.genderUpdate, controllers.updateById)

module.exports = router