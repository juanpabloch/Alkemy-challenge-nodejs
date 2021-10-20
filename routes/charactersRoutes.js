const express = require('express')
const router = express.Router()
const Characters = require('../models/charactersModels')
const Validators = require('../middleware')
const {Op} = require('sequelize')


router.get('/', async(req, res, next)=>{
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
 
         const response = await Characters.findAll({
             attributes: ["id", "name", "image"]
         })
         res.json(response)
    } catch (error) {
        next(error)
    }
 })
 
 router.get('/:id', Validators.idValidators, async(req, res, next)=>{
     try {
         const {id} = req.params
         const response = await Characters.findByPk(id)
         if(!response)throw new Error('Character not exist')
         res.json(response)
     } catch (error) {
         next(error)
     }
 })
 
 router.post('/', Validators.charactersBodyValidators, async(req, res, next)=>{
     try {
        const { name, age, weight, history } = req.body
        const image = req.file.path
        if(image.length > 250)throw new Error('image name too long')

        const character = await Characters.create({name, age, weight, history, image})
        res.status(201).json(character)
     } catch (error) {
         next(error)
     }
 })
 
 router.delete('/:id', Validators.idValidators, async(req, res, next)=>{
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
 
 router.put('/:id', [Validators.idValidators], async(req, res, next)=>{
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
 })

module.exports = router