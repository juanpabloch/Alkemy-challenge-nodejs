const express = require('express')
const app = express()

const port = process.env.PORT || 3000

app.use(express.urlencoded())
app.use(express.json())

//sequelize
const sequelize = require('./database/db')
const Gender = require('./models/genderModels')
const Movies = require('./models/moviesModels')
const Characters = require('./models/charactersModels')
//importamos la relacion many to many para que la base de datos sepa que existe esta relacion
require("./models/associations")

//middlewares
const Validators = require('./middleware')


app.get('/', (req, res)=>{
    res.status(200).json({mensaje: "welcome"})
})

//genero
app.get('/gender', async(req, res)=>{
    try {
        const response = await Gender.findAll()
        res.json(response)
    } catch (error) {
        console.log(error)
    }
})

app.get('/gender/:id', Validators.idValidators, async(req, res, next)=>{
    try {
        const {id} = req.params
        const response = await Gender.findByPk(id)
        if(!response)throw new Error('Gender not exist')
        res.json(response)
    } catch (error) {
        next(error)
    }
})

app.post('/gender', Validators.genderValidators, async(req, res, next)=>{
    try {
        const {name, image} = req.body
        const response = await Gender.create({"name": name.trim(), "image":image})
        res.status(201).json(response)
    } catch (error) {
        next(error)
    }
})

app.delete('/gender/:id', Validators.idValidators, async(req, res, next)=>{
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

app.put('/gender/:id', [Validators.idValidators, Validators.genderValidators], async(req, res, next)=>{
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

//peliculas
app.get('/movies', async(req, res, next)=>{
    try {
        const response = await Movies.findAll({
            attributes: ["id", "title", "date"]
        })
        res.json(response)
    } catch (error) {
        next(error)
    }
})
app.get('/movies/:id', Validators.idValidators, async(req, res, next)=>{
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
app.post('/movies', Validators.moviesBodyValidators, async(req, res, next)=>{
    try {
        const response = await Movies.create(req.body)
        res.status(201).json(response)
    } catch (error) {
        next(error)
    }
})

app.delete('/movies/:id', Validators.idValidators, async(req, res, next)=>{
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

//personajes
app.get('/characters', async(req, res, next)=>{
   try {
        const response = await Characters.findAll({
            attributes: ["id", "name"]
        })
        res.json(response)
   } catch (error) {
       next(error)
   }
})

app.get('/characters/:id', async(req, res, next)=>{
    try {
        const {id} = req.params
        const response = await Characters.findByPk(id)
        if(!response)throw new Error('Character not exist')
        res.json(response)
    } catch (error) {
        next(error)
    }
})

app.post('/characters', Validators.charactersBodyValidators, async(req, res, next)=>{
    try {
        const character = await Characters.create(req.body)
        res.status(201).json(character)
    } catch (error) {
        next(error)
    }
})

app.delete('/characters/:id', Validators.idValidators, async(req, res, next)=>{
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
})

app.put('/characters/:id', [Validators.charactersBodyValidators, Validators.idValidators], async(req, res, next)=>{
    try {
        const {id} = req.params
        const { name, age, weight, history } = req.body
        let response = await Characters.update({
            name, age, weight, history
        },{
            where:{
                id
            }
        })

        response = await Characters.findByPk(id)
        if(!response)throw new Error('Character not exist')
        res.json(response)
    } catch (error) {
        next(error)
    }
})

app.use((req, res)=>{
    res.status(404).json({msj: "Not found"})
})

//error handler
app.use((err, req, res, next)=>{
    if(err.errors){
        res.status(400).json({error:err.errors[0].message})
        return
    }
    res.status(400).json({error:err.message})
})


app.listen(port, async()=>{
    try {
        console.log(`app listening on port ${port}`)
        //conectamos a la base de datos
        await sequelize.authenticate()
        await sequelize.sync({alter:true})
        console.log('connected to database')
    } catch (error) {
        console.log(`error to connect: ${error}`)
    }
})