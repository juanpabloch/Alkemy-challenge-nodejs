const Users = require('../models/userModels')
const {hash, unHash} = require('../utils/bcrypt')
const {createToken} = require('../services/auth')
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey('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')
const msg = (to, text, html)=>{
    return {
        to,
        from: 'juanpablo_ch2@hotmail.com',
        subject: 'Welcome to Explore-Disney API',
        text,
        html
    }
}

const register = async (req, res, next)=>{
    try {
        const {userName, email} = req.body
        const password = hash(req.body.password)
    
        await Users.create({userName, email: email.trim(), password})
        
        const text = `hello ${userName}`
        const html = `<h1>Hello ${userName}! and Welcome to Explore-Disney API</h1>`
        sgMail.send(msg(email.trim(), text, html))
            .then(()=>{
                console.log('email sent')
            })
            .catch(err=>{
                console.log(err)
            })

        res.status(201).json({msg: "user register successf1ully"})
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