import React, { useState } from 'react'

const Statistics = (props) => <p>{props.name} {props.result}</p>

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  let average = 0
  let positive = 0

  if (all !== 0) {
    average = (good - bad) / all
    positive = 100 * good / all
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={()=>setGood(good+1)}>good</button>
      <button onClick={()=>setNeutral(neutral+1)}>neutral</button>
      <button onClick={()=>setBad(bad+1)}>bad</button>
      <h1>statistics</h1>
      <Statistics name="good" result={good}  />
      <Statistics name="neutral" result={neutral} />
      <Statistics name="bad" result={bad}  />
      <Statistics name="all" result={all}  />
      <Statistics name="average" result={average}  />
      <p>positive {positive} %</p>
    </div>
  )
}

export default App
