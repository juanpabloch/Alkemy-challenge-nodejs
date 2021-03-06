const Users = require('../models/userModels')
const {hash, unHash} = require('../utils/bcrypt')
const {createToken} = require('../services/auth')
// const sgMail = require('@sendgrid/mail')

const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'juanpablochoternasty@gmail.com',
        pass: process.env.EMAIL-PASS
    }
})
const mailOptions = (to, message)=>{
    return {
        from: "juanpablo@mailOptions.com",
        to, 
        subject: "Welcome to Explore-Disney API", 
        html: message 
    }
}
const emailHtml = require('../utils/email')

// const apikey = process.env.SENDGRID_API_KEY
// sgMail.setApiKey(apikey)
// const msg = (to, text, html)=>{
//     return {
//         to,
//         from: 'juanpablo_ch2@hotmail.com',
//         subject: 'Welcome to Explore-Disney API',
//         text,
//         html
//     }
// }

const register = async (req, res, next)=>{
    try {
        const {userName, email} = req.body
        const password = hash(req.body.password)
    
        await Users.create({userName, email: email.trim(), password})
        
        const text = `hello ${userName}`
        const html = emailHtml(userName)
        // const html = `<h1>Hello ${userName}! and Welcome to Explore-Disney API</h1>`
        // sgMail.send(msg(email.trim(), text, html))
        //     .then(()=>{
        //         console.log('email sent')
        //     })
        //     .catch(err=>{
        //         console.log(err)
        //     })

        transporter.sendMail(mailOptions(email.trim(), emailHtml(userName)), (err, info)=>{
            if(err){
                console.log(err)
            }else{
                console.log(`email sent to: ${email}`)
            }
        })
        res.status(201).json({msg: "user register successfully"})
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
            msj: "login successfully",
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