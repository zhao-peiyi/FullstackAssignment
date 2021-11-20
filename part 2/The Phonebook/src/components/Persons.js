import React from 'react'

const Person = ( {person, deletePerson} ) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={deletePerson}>delete</button>
    </div>
  )
}

const Persons = ( {filterToShow, deletePersonOf } ) => {
  return (
    <>
      { filterToShow.map( person => <Person key={person.id} person={person} deletePerson={()=>deletePersonOf(person.id)}/> )}
    </>
  )
}

export default Persons
