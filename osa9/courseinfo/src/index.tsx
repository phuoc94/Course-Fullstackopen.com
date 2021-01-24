import React from "react";
import ReactDOM from "react-dom";
import { PartType } from './types';

const Header: React.FC<{name: string}> = ({name}) => (
    <h1>{name}</h1>
);

const Part: React.FC<{part: PartType}> = ({part}) => (
    <p>{part.name} {part.exerciseCount}</p>
)

const Content: React.FC<{courseParts: PartType[]}> = ({courseParts}) => (
  <div>
    {courseParts.map((part) => 
      <Part part={part} key={part.name}/>
    )}
  </div>
);

const Total: React.FC<{courseParts: PartType[]}> = ({courseParts}) => (
  <p>
    Number of exercises{" "}
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
);


const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));