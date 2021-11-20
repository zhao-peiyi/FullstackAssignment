import React, { useState , useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './service/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterToShow, setFilterToShow ] = useState( persons )

  useEffect (()=>{
    personsService
      .getAll()
      .then( response => {
        setPersons( response )
        setFilterToShow( response )
      })
  },[])

  const addName = (event) => {
    event.preventDefault()

    const checkExistedName = ( person ) => person.name === newName

    if ( persons.some(checkExistedName) ) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        // id: persons.length + 1,
      }

      personsService
        .create( newPerson )                                     // send information to server
        .then( response => {
          const newPersons = persons.concat( response )          // show information on browser
          setPersons(newPersons)
          setFilterToShow(newPersons)

          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePersonOf = (id) => {
    const oldPerson = persons.find( person => person.id === id )
    window.confirm(`Delete ${oldPerson.name} ?`)

    personsService
      .deleteOne(id)
      .then ( response => {
        const newPersons = persons.filter( person => person.id !== id )
        setPersons(newPersons)
        setFilterToShow(newPersons)
      })
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
      <Filter onFilter={filter}/>
      <h2>Add a new</h2>
      <PersonForm newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber} addName={addName}/>
      <h2>Numbers</h2>
      <Persons filterToShow={filterToShow} deletePersonOf={deletePersonOf}/>
    </div>
  )
}

export default App
