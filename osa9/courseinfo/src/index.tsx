import React from "react";
import ReactDOM from "react-dom";
import { CoursePart } from './types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Header: React.FC<{name: string}> = ({name}) => (
    <h1>{name}</h1>
);

const Part: React.FC<{part: CoursePart}> = ({part}) => {
  switch (part.name) {
    case 'Fundamentals':
      return (
        <div>
          <p>name: {part.name}</p>
          <p>exercise: {part.exerciseCount}</p>
          <p>description: {part.description}</p>
          <hr />
        </div>
      );
    case 'Using props to pass data':
      return (
        <div>
          <p>name: {part.name}</p>
          <p>exercise: {part.exerciseCount}</p>
          <p>group projects: {part.groupProjectCount}</p>
          <hr />
        </div>
      );
    case 'Deeper type usage':
      return (
        <div>
          <p>name: {part.name}</p>
          <p>exercise: {part.exerciseCount}</p>
          <p>description: {part.description}</p>
          <p>submissionLink: {part.exerciseSubmissionLink}</p>
          <hr />
        </div>
      );
    case 'New course':
      return (
        <div>
          <p>name: {part.name}</p>
          <p>exercise: {part.exerciseCount}</p>
          <p>description: {part.description}</p>
          <p>students: {part.students}</p>
          <hr />
        </div>
      );
    default:
      return assertNever(part);
  }
};

const Content: React.FC<{courseParts: CoursePart[]}> = ({courseParts}) => (
  <div>
    {courseParts.map((part) => 
      <Part part={part} key={part.name}/>
    )}
  </div>
);

const Total: React.FC<{courseParts: CoursePart[]}> = ({courseParts}) => (
  <p>
    Number of exercises{" "}
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
);


const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "New course",
      exerciseCount: 14,
      description: "Confusing description",
      students: 20
    },
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