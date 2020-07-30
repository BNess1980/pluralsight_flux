import React from 'react';
import { Link } from 'react-router-dom';

function CourseList(props) {

    return(
        <>
        <table className="table mt-4">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.courses.map((course) => {
              return (
                <tr key={course.id}>
                  <td><Link to={"/course/" + course.slug}>{course.title}</Link></td>
                  <td>{props.findAuthor(course.authorId)}</td>
                  <td>{course.category}</td>
                  <td><button className="btn btn-danger" onClick={() => props.deleteCourse(course.id) }>Delete</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>        
    )
}

export default CourseList;