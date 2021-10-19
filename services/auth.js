const jwt = require('jsonwebtoken')
const fs = require('fs')

const privateKey = fs.readFileSync('./keys/privateKey.pem')
const publicKey = fs.readFileSync('./keys/publicKey.pem')

const singOptions = { expiresIn: "7d", algorithm: "RS256" }

//login
const createToken = (payload)=>jwt.sign(payload, privateKey, singOptions)

//autenticar
const decodeToken = (token)=>jwt.verify(token, publicKey)

module.exports = {
    createToken,
    decodeToken
}