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
        if(!response)throw new Error('Gender no exist')
        res.json(response)
    } catch (error) {
        next(error)
    }
})

app.post('/gender', Validators.genderValidators, async(req, res, next)=>{
    try {
        const {nombre, imagen} = req.body
        const response = await Gender.create({"nombre": nombre.trim(), "imagen":imagen})
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
        if(!response)throw new Error('Gender no exist')
        res.json({msg: "Delete successful"})

    } catch (error) {
        next(error)
    }
})

app.put('/gender/:id', [Validators.idValidators, Validators.genderValidators], async(req, res, next)=>{
    try {
        const {id} = req.params
        const {nombre} = req.body
        let response = await Gender.update({
            nombre
        },{
            where:{
                id
            }
        })
        response = await Gender.findByPk(id)
        if(!response)throw new Error('Gender no exist')
        res.json(response)
    } catch (error) {
        next(error)
    }
})

//peliculas
app.get('/movies', async(req, res, next)=>{
    try {
        const response = await Movies.findAll({
            attributes: ["id", "titulo", "fecha"]
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
            include: [Gender]
        })
        if(!response)throw new Error('Movie no exist')
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
        if(!response)throw new Error('Movie no exist')
        res.json({msg: "Delete successful"})

    } catch (error) {
        next(error)
    }
})

//personajes
app.get('/characters', async(req, res)=>{
    const response = await Characters.findAll({
        attributes: ["id", "nombre"]
    })
    res.json(response)
})

app.get('/characters/:id', async(req, res)=>{
    const {id} = req.params
    const response = await Characters.findByPk(id)
    console.log(response.dataValues)
    res.json(response.dataValues)
})

app.post('/characters', Validators.charactersBodyValidators, async(req, res, next)=>{
    try {
        const { nombre, edad, peso, historia } = req.body
        const character = await Characters.create({nombre, edad, peso, historia})
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
        if(!response)throw new Error('Character no exist')
        res.json({msg: "Delete successful"})

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