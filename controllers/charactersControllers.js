const Characters = require('../models/charactersModels')
const Movies = require('../models/moviesModels')
const Genre = require('../models/genreModels')
const {Op} = require('sequelize')

const list = async(req, res, next)=>{
    try {
        //name query
        if(req.query.name){
            const response = await Characters.findAll({
                attributes: ["id", "name", "image"],
                where: {
                    name: {[Op.substring] : req.query.name}
                }
            })
            res.json(response)
            return
        }
 
        //age query
        if(req.query.age){
         const response = await Characters.findAll({
             attributes: ["id", "name", "image"],
             where: {
                 age: {[Op.substring] : req.query.age}
             }
         })
         res.json(response)
         return
        }

        //movies query
        if(req.query.movies){
            const response = await Characters.findAll({
                attributes: ["id", "name", "image"],
                include: [{
                    model: Movies,
                    where: {id: req.query.movies},
                    include: [Genre],
                    attributes: {exclude: 'genre_id'}
                }]
            })

            res.json(response)
            return
        }
 
         const response = await Characters.findAll({
             attributes: ["id", "name", "image"]
         })
         res.json(response)
    } catch (error) {
        next(error)
    }
 }

const searchById = async(req, res, next)=>{
    try {
        const {id} = req.params
        const response = await Characters.findOne({
            where: {
                id
            },
            include: [{model: Movies, attributes: ['id', 'title']}]
        })
        if(!response)throw new Error('Character not exist')
        res.json(response)
    } catch (error) {
        next(error)
    }
}

const add = async(req, res, next)=>{
    try {
       const { name, age, weight, history } = req.body
       const image = req.file.path
       if(image.length > 250)throw new Error('image name too long')

       const character = await Characters.create({name, age, weight, history, image})
       res.status(201).json(character)
    } catch (error) {
        next(error)
    }
}

const deleteById = async(req, res, next)=>{
    try {
        const {id} = req.params
        const response = await Characters.destroy({
            where:{
                id: id
            }
        })
        if(!response)throw new Error('Character not exist')
        res.json({msg: "Delete successful"})

    } catch (error) {
        next(error)
    }
}

const updateById = async(req, res, next)=>{
    try {
        const {id} = req.params
        const { name, age, weight, history } = req.body
        let character = await Characters.findByPk(id)
        if(!character)throw new Error('Character not exist')
        let image = null
        if(req.file){
            image = req.file.path
        }
        console.log(character.name)
        const update = {
            "name": name || character.name,
            "age": age || character.age,
            "weight": weight || character.weight,
            "history": history || character.history,
            "image": image || character.image
        }
        
        await Characters.update(update ,{
            where:{
                id
            }
        })

        character = await Characters.findByPk(id)

        res.status(200).json(character)
    } catch (error) {
        next(error)
    }
}

const addMovie = async (req, res, next)=>{
    try {
        const {idCharacter, idMovie} = req.params
        let character = await Characters.findByPk(idCharacter)
        if(!character)throw new Error('Character not exist')

        const movie = await Movies.findByPk(idMovie)
        if(!movie)throw new Error('Movie not exist')

        character.addMovie(movie)
        character = await Characters.findOne({
            where: {
                id: idCharacter
            },
            include: [{model: Movies, attributes: ['title']}]
        })

        res.json(character)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    list,
    searchById,
    add,
    deleteById,
    updateById,
    addMovie
}