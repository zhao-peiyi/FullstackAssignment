const mongoose = require('mongoose')

const url = process.env.MONGODB_URL

mongoose.connect(url)
    .then( result => console.log('connected to MongoDB'))
    .catch( error => console.log('error connecting to MongoDB:', error) )

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.set( 'toJSON', {
    transform: ( document, returnedObject ) => {
        returnedObject.id = document._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = mongoose.model( 'Person', personSchema)

module.exports = Person
