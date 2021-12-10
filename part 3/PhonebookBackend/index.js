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

app.use(express.static("build"))

// Router
app.get('/api/persons', (request, response) => {
    Person
        .find({})
        .then( result => response.json(result) )
})

app.get('/info', (request, response) => {
  const amount = data.length
  const date = Date()
  const info = `<p>Phonebook has info fo ${amount} people</p><p>${date}</p>`

  response.send(info)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number( request.params.id )
  const person = data.find( person => person.id === id )

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id' , (request, response) => {
  const id = Number( request.params.id )
  data = data.filter( person => person.id !== id )

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const person = request.body

  if ( !person.name ) {
    return response.status(400).json({ error: "name missing" })
  } else if ( !person.number ) {
    return response.status(400).json({ error: "number missing" })
  } else if ( data.some( oldPerson => oldPerson.name === person.name )) {
    return response.status(400).json({ error: 'name must be unique' })
  }

  const personObject = {
    id: Math.floor( 100000 * Math.random()),
    name: person.name,
    number: person.number
  }

  // console.log( personObject );
  data = data.concat( personObject )

  response.json( personObject )
})

const PORT = process.env.PORT || 3001
app.listen( PORT, () => {
  console.log( `Server running on port ${PORT}` );
})
