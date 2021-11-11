import React, { useState } from 'react'

const StatisticLine = (props) => {
  if (props.text === "positive") {
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value} %</td>
      </tr>
    )
  }
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = ({data}) => {
  if (data.all === 0) {
    return <p>No feedback given</p>
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={data.good} />
        <StatisticLine text="neutral" value={data.neutral} />
        <StatisticLine text="bad" value={data.bad} />
        <StatisticLine text="all" value={data.all} />
        <StatisticLine text="average" value={data.average} />
        <StatisticLine text="positive" value={data.positive} />
      </tbody>
    </table>
  )
}

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
    average = average.toFixed(1)         // Keep one decimal place after the decimal point
    positive = 100 * good / all
    positive = positive.toFixed(1)       // Keep one decimal place after the decimal point
  }

  const data = {
    good,
    neutral,
    bad,
    all,
    average,
    positive,
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={()=>setGood(good+1)}>good</button>
      <button onClick={()=>setNeutral(neutral+1)}>neutral</button>
      <button onClick={()=>setBad(bad+1)}>bad</button>
      <h1>statistics</h1>
      <Statistics data={data}/>
    </div>
  )
}

export default App
