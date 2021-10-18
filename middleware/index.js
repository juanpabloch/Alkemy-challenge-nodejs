const validators = require('./validations')

const idValidators = [
    validators.isNumber
]

const moviesBodyValidators = [
    validators.moviesBody
]

const genderValidators = [
    validators.genderBody
]

const charactersBodyValidators = [
    validators.charactersBody
]

module.exports = {
    idValidators,
    genderValidators,
    moviesBodyValidators,
    charactersBodyValidators
}