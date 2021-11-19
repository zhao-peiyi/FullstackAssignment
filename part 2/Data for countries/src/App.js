import React, { useState , useEffect } from 'react'
import axios from 'axios'

const Weather = ( {country} ) => {
  const [ info, setInfo ] = useState({})

  const url = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital[0]}`

  useEffect( ()=> {
    axios
      .get( url )
      .then( response => {
        const newInfo = { ...response.data.current }
        setInfo(newInfo)
      })
  }, [])

  return(
    <div>
      <h2>Weather in { country.capital }</h2>
      <p>
        <b>temperatures: </b> <span>{ info.temperature }</span>
      </p>
      <img src={ info.weather_icons } alt='wheaher icon' />
      <p>
        <b>wind: </b> <span>{ info.wind_speed } mph direction { info.wind_dir }</span>
      </p>
    </div>
  )
}

const Detail = ( {country} ) => {
  return (
    <div>
      <h1>{ country.name.common }</h1>
      <p>capital { country.capital }</p>
      <p>area { country.area }</p>
      <h2>Spoken languages</h2>
      <ul>
        { Object.values(country.languages).map( language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.name.common}/>
      <Weather country={ country } />
    </div>
  )
}

const App = () => {
  const [ text, setText ] = useState('')
  const [ countries, setCountries ] = useState([])
  const [ result, setResult ] = useState('')

  useEffect(()=>{
    axios
      .get('https://restcountries.com/v3.1/all')
      .then( response => {
        setCountries( response.data)
      })
  },[])
  // console.log( countries )                         // test for first and second rendering

  const handleInputText = ( event ) => {
    // console.log( event.target.value )
    setText( event.target.value )                  // It could also work without variable text, just use event.target.value
    filter(event.target.value )
  }

  const handleClick = (event,country) => {
    setResult(<Detail country= { country } />)
  }

  const filter = ( oringialText ) => {
    const text = oringialText.toLowerCase()
    if ( text === '' ) {
      setResult('')
    } else {
      const list = countries.filter( country => {
        const countryName = country.name.common.toLowerCase()
        return countryName.indexOf( text ) !== -1
      })
      if ( list.length > 10 ) {
        setResult('Too many matches, specify another filter')
      } else if ( list.length > 1 ) {
        setResult( list.map( country => {
          return (
            <div key={country.name.common}>
              <span>{country.name.common}</span>
              <input type="button" value="show" onClick={(event)=> handleClick(event,country)}/>
            </div>
          )
        }))
      } else if (list.length === 1 ) {
        setResult(<Detail country= { list[0] } />)
      } else {
        setResult('')
      }
    }
  }

  return (
    <div>
      <div>find countries <input value={text} onChange={handleInputText}/></div>
      <div>{result}</div>
    </div>
  )
}

export default App
