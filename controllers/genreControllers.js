const Genre = require('../models/genreModels')
const {Op} = require('sequelize')

const list = async(req, res, next)=>{
    try {
        if(req.query.name){
            const response = await Genre.findAll({
                where: {
                    name: {[Op.substring]: req.query.name}
                }
            })
            res.json(response)
        }

        const response = await Genre.findAll()
        res.json(response)
    } catch (error) {
        next(error)
    }
}

const searchById = async(req, res, next)=>{
    try {
        const {id} = req.params
        const response = await Genre.findByPk(id)
        if(!response)throw new Error('Genre not exist')
        res.json(response)
    } catch (error) {
        next(error)
    }
}

const add = async(req, res, next)=>{
    try {
        const {name} = req.body
        const image = req.file.path
        if(image.length > 250)throw new Error('image name too long')
        const response = await Genre.create({"name": name.trim(), "image": image})
        res.status(201).json(response)
    } catch (error) {
        next(error)
    }
}

const deleteById = async(req, res, next)=>{
    try {
        const {id} = req.params
        const response = await Genre.destroy({
            where:{
                id: id
            }
        })
        if(!response)throw new Error('Genre not exist')
        res.json({msg: "Delete successful"})

    } catch (error) {
        next(error)
    }
}

const updateById = async(req, res, next)=>{
    try {
        const {id} = req.params
        const {name} = req.body
        let genre = await Genre.findByPk(id)
        if(!genre)throw new Error('Genre not exist')
        let image = null
        if(req.file){
            image = req.file.path
        }
        const update = {
            'name': name || genre.name,
            'image': image || genre.image
        }
        await Genre.update(update,{
            where:{
                id
            }
        })
        
        genre = await Genre.findByPk(id)
        res.json(genre)
    } catch (error) {
        next(error)
    }
}


module.exports = {
    list,
    searchById,
    add,
    deleteById,
    updateById
}