import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = ({ text }) => <h1>{text}</h1>


const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;

const StatisticLine = ({ text, value, afterVal }) => <tr><td>{text}</td><td>{value} {afterVal}</td></tr>

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const avg = ((good * 1) + (neutral * 0) + (bad * -1)) / all
  const positive = good / all * 100
  if (all <= 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={avg} />
          <StatisticLine text="positive" value={positive} afterVal="%" />
        </tbody>
      </table>
    </div>
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => setGood(good + 1);
  const addNeutral = () => setNeutral(neutral + 1);
  const addBad = () => setBad(bad + 1);



  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={addGood} text="Good" />
      <Button handleClick={addNeutral} text="Neutral" />
      <Button handleClick={addBad} text="Bad" />
      <Header text="statics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"));
