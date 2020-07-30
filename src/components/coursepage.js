import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import courseStore from "../stores/coursestore";
//import authorStore from "../stores/authorstore";
import CourseList from './courselist';
import { Link } from 'react-router-dom';
import authorStore from "../stores/authorstore"
import { loadCourses, deleteCourse, loadAuthors } from "../actions/courseactions";

// Hooks component; must be functional component
function CoursePage() {
  // use state replaces setState from class components
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [authors, setAuthors] = useState(authorStore.getAuthors());
  // useEffect replaces componentDidMount, componentDidUpdate, and componentDidUnmount
  // used whenever the compoenent needs to instantiate
  useEffect(() => {
    // LAZY LOADING COURSES
    // Event listener for onChange; fires when component mounts
    courseStore.addChangeListener(onCourseChange);
    //authorStore.addChangeListener(onChange);
    // check if no courses; if not then fire loadCourses() from course actions 
    if(courseStore.getCourses().length === 0) loadCourses();
    return () => courseStore.removeChangeListener(onCourseChange); // Remove change listener when component unmounts
  }, []);

  function onCourseChange(courses) {
    // sets the courses in state
    setCourses(courseStore.getCourses());
  }  

  // use effect for authors
  useEffect(() => {
    authorStore.addChangeListener(onAuthorChange);
    if(authorStore.getAuthors().length === 0) {
      loadAuthors();
    } else {
      setAuthors(authorStore.getAuthors());
    }
    return () => authorStore.removeChangeListener(onAuthorChange); // Remove change listener when component unmounts
  }, []);  

  function onAuthorChange() {
    setAuthors(authorStore.getAuthors());
  }
  
  function findAuthor(id) {
    let author = authors.find(author => author.id === id);
    if(author && author.hasOwnProperty('name')) {
      return author.name;
    }
  }

  return (
    // Dumb Component; Data is passed down from this, the parent
    <>
    <h2>Courses Page</h2>
    <Link className="btn btn-primary mb-2" to="/course/">Add Course</Link>
    <CourseList courses={courses} findAuthor={findAuthor} deleteCourse={deleteCourse} /> 
    </>
  );
}

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  deleteCourse: PropTypes.func,
  findAuthor: PropTypes.func
}

export default CoursePage;
