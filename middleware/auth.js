const {decodeToken} = require('../services/auth')

const secureUser = (req, res, next)=>{
    try {
        const { authorization } = req.headers
        const {id} = decodeToken(authorization)
        req.id = id
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({error: "Not authorized need token"})
    }
}

module.exports = secureUser