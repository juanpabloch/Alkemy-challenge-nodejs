const Gender = require('../models/genderModels')
const {Op} = require('sequelize')

const list = async(req, res, next)=>{
    try {
        if(req.query.name){
            const response = await Gender.findAll({
                where: {
                    name: {[Op.substring]: req.query.name}
                }
            })
            res.json(response)
        }

        const response = await Gender.findAll()
        res.json(response)
    } catch (error) {
        next(error)
    }
}

const searchById = async(req, res, next)=>{
    try {
        const {id} = req.params
        const response = await Gender.findByPk(id)
        if(!response)throw new Error('Gender not exist')
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
        const response = await Gender.create({"name": name.trim(), "image": image})
        res.status(201).json(response)
    } catch (error) {
        next(error)
    }
}

const deleteById = async(req, res, next)=>{
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
}

const updateById = async(req, res, next)=>{
    try {
        const {id} = req.params
        const {name} = req.body
        let gender = await Gender.findByPk(id)
        if(!gender)throw new Error('Gender not exist')
        let image = null
        if(req.file){
            image = req.file.path
        }
        const update = {
            'name': name || gender.name,
            'image': image || gender.image
        }
        await Gender.update(update,{
            where:{
                id
            }
        })
        
        gender = await Gender.findByPk(id)
        res.json(gender)
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