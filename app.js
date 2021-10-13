const express = require('express')
const app = express()

const port = process.env.PORT || 3000

app.use(express.urlencoded())
app.use(express.json())

//sequelize
const sequelize = require('./database/db')
const Genero = require('./models/generoModelo')
const Pelicula = require('./models/peliculaModelo')
const Personaje = require('./models/personajeModelo')
//importamos la relacion many to many para que la base de datos sepa que existe esta relacion
require("./models/associations")


app.get('/', (req, res)=>{
    res.status(200).json({mensaje: "hola"})
})

//genero
app.get('/genero', async(req, res)=>{
    try {
        const response = await Genero.findAll()
        res.json(response)
    } catch (error) {
        console.log(error)
    }
})

app.post('/genero', async(req, res)=>{
    try {
        const response = await Genero.create(req.body)
        console.log(response)
        res.json(response)
    } catch (error) {
        console.log(error)
        res.json(error)
    }
})

//peliculas
app.get('/pelicula', async(req, res)=>{
    const response = await Pelicula.findAll()
    res.json(response)
})
app.get('/pelicula/:id', async(req, res)=>{
    const {id} = req.params
    const response = await Pelicula.findByPk(id)
    res.json(response)
})
app.post('/pelicula', async(req, res)=>{
    const response = await Pelicula.create(req.body)
    console.log(response)
    res.json(response)
})

//personajes
app.get('/personaje', async(req, res)=>{
    const response = await Personaje.findAll({
        attributes: ["nombre"]
    })

    res.json(response)
})

app.get('/personaje/:id', async(req, res)=>{
    const {id} = req.params
    const response = await Personaje.findByPk(id)
    console.log(response.dataValues)
    const peliculas = await PeliPerso.findAll({
        where: {
            personaje_id: Number(id)
        },
        attributes: {exclude:["personaje_id", "id"]}
    })
    res.json({...response.dataValues, peliculas})
})

app.post('/personaje', async(req, res)=>{
    const { nombre, edad, peso, historia, pelicula } = req.body
    const personaje = await Personaje.create({nombre, edad, peso, historia})
    const response = await Personaje.addPelicula()
    console.log(response)
    res.json(personaje)
})

app.listen(port, async()=>{
    try {
        console.log(`app listening on port ${port}`)
        //conectamos a la base de datos
        await sequelize.authenticate()
        await sequelize.sync({force:false})
        console.log('connected to database')
    } catch (error) {
        console.log(`error to connect: ${error}`)
    }
})