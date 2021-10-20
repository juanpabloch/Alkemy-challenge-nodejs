const express = require('express')
const router = express.Router()
const Validators = require('../middleware')
const Gender = require('../models/genderModels')


router.get('/', async(req, res)=>{
    try {
        const response = await Gender.findAll()
        res.json(response)
    } catch (error) {
        console.log(error)
    }
})

router.get('/:id', Validators.idValidators, async(req, res, next)=>{
    try {
        const {id} = req.params
        const response = await Gender.findByPk(id)
        if(!response)throw new Error('Gender not exist')
        res.json(response)
    } catch (error) {
        next(error)
    }
})

router.post('/', Validators.genderValidators, async(req, res, next)=>{
    try {
        const {name} = req.body
        const image = req.file.path
        if(image.length > 250)throw new Error('image name too long')
        const response = await Gender.create({"name": name.trim(), "image": image})
        res.status(201).json(response)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', Validators.idValidators, async(req, res, next)=>{
    try {
        const {id} = req.params
        const response = await Gender.destroy({
            where:{
                id: id
            }
        })
        if(!response)throw new Error('Gender not exist')
        res.json({msg: "Delete successful"})

    } catch (error) {
        next(error)
    }
})

router.put('/:id', [Validators.idValidators, Validators.genderValidators], async(req, res, next)=>{
    try {
        const {id} = req.params
        const {name} = req.body
        let response = await Gender.update({
            name
        },{
            where:{
                id
            }
        })
        response = await Gender.findByPk(id)
        if(!response)throw new Error('Gender not exist')
        res.json(response)
    } catch (error) {
        next(error)
    }
})


module.exports = router