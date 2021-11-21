const express = require( 'express' )
const app = express()

const data = [
    {
      "id": 1,
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": 2,
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": 3,
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": 4,
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
  if (data) {
    response.json(data)
  } else {
    response.status(204).end()
  }
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

const PORT = 3001
app.listen( PORT, () => {
  console.log( `Server running on port ${PORT}` );
})
