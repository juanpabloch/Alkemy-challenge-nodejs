const express = require('express')
const router = express.Router()
const Validators = require('../middleware')
const Movies = require('../models/moviesModels')
const Gender = require('../models/genderModels')


router.get('/', async(req, res, next)=>{
    try {
        const response = await Movies.findAll({
            attributes: ["id", "title", "date", "image"]
        })
        res.json(response)
    } catch (error) {
        next(error)
    }
})
router.get('/:id', Validators.idValidators, async(req, res, next)=>{
    try {
        const {id} = req.params
        const response = await Movies.findOne({
            where: {
                id
            },
            include: [Gender],
            attributes: {exclude: "gender_id"}
        })
        if(!response)throw new Error('Movie not exist')
        res.json(response)
    } catch (error) {
        next(error)
    }
})
router.post('/', Validators.moviesBodyValidators, async(req, res, next)=>{
    try {
        const { title, date, rate, gender_id} = req.body
        const image = req.file.path
        if(image.length > 250)throw new Error('image name too long')
        const response = await Movies.create({ title, date, rate, gender_id, image })
        res.status(201).json(response)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', Validators.idValidators, async(req, res, next)=>{
    try {
        const {id} = req.params
        const response = await Movies.destroy({
            where:{
                id: id
            }
        })
        if(!response)throw new Error('Movie not exist')
        res.json({msg: "Delete successful"})

    } catch (error) {
        next(error)
    }
})

router.put('/:id', Validators.idValidators, async(req, res, next)=>{
    try {
        const {id} = req.params
        let movie = await Movies.findByPk(id);
        if(!movie)throw new Error('Movie not exist')
        let image = null
        if(req.file){
            image = req.file.path
        }
        const update = {
            "title": req.body.title || movie.title, 
            "date": req.body.date || movie.date,
            "rate": req.body.rate || movie.rate,
            "gender_id": req.body.gender_id || movie.gender_id,
            "image": image || movie.image  
        }

        await Movies.update(update, {
            where:{
                id
            }
        })

        movie = await Movies.findByPk(id);
        res.status(200).json(movie)
    } catch (error) {
        next(error)
    }
})

module.exports = router