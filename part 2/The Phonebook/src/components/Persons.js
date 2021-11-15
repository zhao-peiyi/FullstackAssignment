import React from 'react'

const Persons = ( {filterToShow} ) => {
  return (
    <>
      { filterToShow.map( person => <div key={person.id}>{person.name} {person.number}</div> )}
    </>
  )
}

export default Persons
