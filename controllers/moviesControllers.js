const Movies = require('../models/moviesModels')
const Genre = require('../models/genreModels')
const Characters = require('../models/charactersModels')
const {Op} = require('sequelize')

const list = async(req, res, next)=>{
    try {
        //title query
        if(req.query.title){
            const response = await Movies.findAll({
                attributes: ["id", "title", "date", "image"],
                where: {
                    title: { [Op.substring]: req.query.title }
                }
            })
            res.status(200).json(response)
            return
        }

        //genre query
        if(req.query.genre){
            const response = await Movies.findAll({
                attributes: ["id", "title", "date", "image"],
                where: {
                    genre_id: { [Op.eq]: req.query.genre }
                }
            })
            res.status(200).json(response)
            return
        }

        //date query
        if(req.query.order){
            let response
            if(req.query.order === 'DESC'){
                response = await Movies.findAll({
                    attributes: ["id", "title", "date", "image"],
                    order:[["date", 'DESC']]
                })
            }else{
                response = await Movies.findAll({
                    attributes: ["id", "title", "date", "image"],
                    order:[["date", 'ASC']]
                })
            }
            
            res.status(200).json(response)
            return
        }

        const response = await Movies.findAll({
            attributes: ["id", "title", "date", "image"]
        })
        res.json(response)
    } catch (error) {
        next(error)
    }
}

const searchById = async(req, res, next)=>{
    try {
        const {id} = req.params
        const response = await Movies.findOne({
            where: {
                id
            },
            include: [Genre, Characters],
            attributes: {exclude: "genre_id"}
        })
        if(!response)throw new Error('Movie not exist')
        res.json(response)
    } catch (error) {
        next(error)
    }
}

const add = async(req, res, next)=>{
    try {
        const { title, date, rate, genre_id} = req.body
        const image = req.file.path
        if(image.length > 250)throw new Error('image name too long')
        const response = await Movies.create({ title, date, rate, genre_id, image })
        res.status(201).json(response)
    } catch (error) {
        next(error)
    }
}

const deleteById = async(req, res, next)=>{
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
}

const updateById = async(req, res, next)=>{
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
            "genre_id": req.body.genre_id || movie.genre_id,
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
}

const addCharacter = async (req, res, next)=>{
    try {
        const {idCharacter, idMovie} = req.params
        const character = await Characters.findByPk(idCharacter)
        if(!character)throw new Error('Character not exist')

        let movie = await Movies.findByPk(idMovie)
        if(!movie)throw new Error('Movie not exist')


        movie.addCharacter(character)
        movie = await Movies.findOne({
            where: {
                id: idMovie
            },
            include: [{model: Characters, attributes: ["name"]}]
        }) 
        res.json(movie)
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
    addCharacter,
}