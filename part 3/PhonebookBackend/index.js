require('dotenv').config()

const express = require( 'express' )
var morgan = require('morgan')
const cors = require('cors')

const app = express()

const Person = require('./models/person')

const jsonParser = express.json()
app.use( jsonParser )

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(cors())

app.use(express.static('build'))

// Router
app.get('/api/persons', (request, response, next) => {
    Person
        .find({})
        .then( result => response.json(result) )
        .catch( error => next(error))
})

app.get('/info', (request, response, next) => {
    Person
        .find({})
        .then( result => response.send(`<p>Phonebook has info fo ${result.length} people</p><p>${Date()}</p>`))
        .catch( error => next(error) )
})

app.get('/api/persons/:id', (request, response, next) => {
    Person
        .findById(request.params.id)
        .then( result => {
            if (result) {
                response.json(result)
            } else {
                response.status(404).end()
            }
        })
        .catch( error => next(error) )
})

app.delete('/api/persons/:id' , (request, response, next) => {
    Person
        .findByIdAndRemove(request.params.id)
        .then( result => response.status(204).end() )
        .catch ( error => next(error) )
})

app.post('/api/persons', (request, response, next) => {
    const person = request.body
    Person
        .find( { name: person.name } )
        .then( result => {
            const personObject = new Person({
                name: person.name,
                number: person.number
            })
            personObject
                .save()
                .then( result => response.json( result ) )
                .catch( error => next(error) )
        })
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    const person = {
        name: body.name,
        number: body.number
    }
    Person
        .findByIdAndUpdate( request.params.id, person, { new: true, runValidators: true } )
        .then( result => response.json(result) )
        .catch( error => next(error) )
})

const unknownEndpoint = ( request, response ) => {
    return response.status(404).send({ error: 'unknownEndpoint' })
}
app.use( unknownEndpoint )

const errorHandler = ( error, request, response, next ) => {
    console.error( error.message )
    if ( error.name === 'CastError' && error.kind === 'ObjectId' ) {
        return response.status(400).send({ error: 'malformatted id' })
    } else if ( error.name === 'ValidationError' ) {
        return response.status(400).json({ error: error.message })
    }
    next( error )
}
app.use( errorHandler )

const PORT = process.env.PORT || 3001
app.listen( PORT, () => {
    console.log( `Server running on port ${PORT}` )
})
