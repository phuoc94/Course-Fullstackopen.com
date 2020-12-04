import React from 'react'
import Course from './Course'

const Courses = ({ courses }) => {
    const coursesEle = courses.map((course) =>
        <Course course={course} key={course.id} />
    )
    return (
        <div>
            {coursesEle}
        </div>
    )
}

export default Courses