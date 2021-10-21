const Users = require('../models/userModels')
const {hash, unHash} = require('../utils/bcrypt')
const {createToken} = require('../services/auth')

const register = async (req, res, next)=>{
    try {
        const {userName, email} = req.body
        const password = hash(req.body.password)
        console.log(password)
        await Users.create({userName, email: email.trim(), password})
        res.status(201).json({msg: "user register successful"})
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next)=>{
    try {
        const {email, password} = req.body;
        const response = await User.findOne({where: {email: email}})
        if(!response)throw new Error('email or password invalid')
        
        const isPasswordValid = unHash(password, response.password)
        if(!isPasswordValid)throw new Error('email or password invalid')
        //token
        const jwtObject = {
            id: response.id,
            userName: response.userName
        }
        const JWT = createToken(jwtObject)
        res.json({
            msj: "login successful",
            token: JWT
    })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    register,
    login
}