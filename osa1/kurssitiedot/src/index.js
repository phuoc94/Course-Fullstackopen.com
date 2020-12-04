import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}
const Content = (props) => {
  const shortid = require('shortid');
  const parts = props.parts.map((part) =>
    <Part part={part} key={shortid.generate()} />
  )
  return (
    <div>
      {parts}
    </div>
  )
}
const Total = (props) => {
  let total = 0
  props.parts.forEach(part => {
    total += part.exercises
  })
  return (
    <p>Number of exercises {total}</p>
  )
}

const Part = (props) => {
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))