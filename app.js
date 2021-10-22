require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')

const multer = require('multer')
const multerStorage = multer.diskStorage({
    destination: 'public/uploads',
    filename: (req, file, cb)=>{
        cb(null, file.originalname);
    }
})

app.use(cors())
app.use(express.urlencoded())
app.use(express.json())
app.use('/public' ,express.static('public'))
app.use(multer({
    storage: multerStorage,
    dest: 'public/uploads',
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cb)=>{
        if(file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png"){
            cb(null, true)
        }else{
            cb(new Error('invalid image format'), false)
        }
    }
}).single('image'))

//sequelize
const sequelize = require('./database/db')
//importamos la relacion many to many para que la base de datos sepa que existe esta relacion
require("./models/associations")

//rutas
const routes = require('./routes')
app.use(routes)

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
        // await sequelize.sync({alter:true})
        console.log('connected to database')
    } catch (error) {
        console.log(`error to connect: ${error}`)
    }
})