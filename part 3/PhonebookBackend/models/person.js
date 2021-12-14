const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

mongoose.connect(url)
    .then( result => console.log('connected to MongoDB'))
    .catch( error => console.log('error connecting to MongoDB:', error) )

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minLength: 3
    },
    number: {
        type: String,
        required: true,
        minLength: 8
    }
})

personSchema.plugin(uniqueValidator)

personSchema.set( 'toJSON', {
    transform: ( document, returnedObject ) => {
        returnedObject.id = document._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = mongoose.model( 'Person', personSchema)

module.exports = Person
