import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterToShow, setFilterToShow ] = useState( persons )

  const addName = (event) => {
    event.preventDefault()

    const checkExistedName = ( person ) => person.name === newName

    if ( persons.some(checkExistedName) ) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const newPersons = persons.concat({
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      })
      // console.log(newPersons)
      setPersons(newPersons)
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNewName = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const filter = ( event ) => {
    // console.log(event.target.value)
    
    const isFilter = event.target.value !== ''

    if( !isFilter ){
      const newFilterToShow = [ ...persons ]
      setFilterToShow( newFilterToShow )
    } else {
      const str = event.target.value.toLowerCase()
      const newFilterToShow = persons.filter( person => {
        const name = person.name.toLowerCase()
        // console.log(name,name.indexOf(str) !== -1)
        return name.indexOf(str) !== -1
      })
      setFilterToShow( newFilterToShow )
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with: <input onChange={filter} /></div>
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>name: <input value={newName} onChange={handleNewName} /></div>
        <div>number: <input value={newNumber} onChange={handleNewNumber} /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      { filterToShow.map( person => <div key={person.id}>{person.name} {person.number}</div> )}
    </div>
  )
}

export default App
