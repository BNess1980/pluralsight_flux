import React, { useState, useEffect } from "react";
import CourseForm from "./courseform";
import courseStore from "../stores/coursestore"
import authorStore from "../stores/authorstore"
import { saveCourse, loadCourses, loadAuthors }  from "../actions/courseactions";

// Component created with fat arrow syntax
const ManageCoursePage = (props) => {

  const [errors, setErrors] = useState({});  
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [authors, setAuthors] = useState(authorStore.getAuthors());
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: "",
  });
  
  // Used for clicking on a course and setting the course to that object (Replaced componentDidMount from React 16.8)
  useEffect( () => {
    courseStore.addChangeListener(onCoursesChange); // fire onChange when Event Listener is triggered from coursestore.js

    const slug = props.match.params.slug; // from url
    if(courses.length === 0) { // manage course page needs to know if courses loaded; if not call actions to invoke api
      loadCourses();
    } else if(slug) { // if courses exists then set course by Slug for form
      setCourse(courseStore.getCourseBySlug(slug)); // get course via Flux
    }
  }, [courses.length, props.match.params.slug]); // If courses array or slug changes rerun ***MUST BE DECLARED OTHERWISE useEffect() will run all the time 

  function onCoursesChange() {
    setCourses(courseStore.getCourses()); // when courses changes anywhere in app a change event is emitted this func is in the callback and is invoked
  }

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

  function handleChange(event) {
    const updatedCourse = {
      ...course,
      [event.target.name]: event.target.value,
    };
    // use spread operator here to copy course object (STATE IS NOT MUTATED DIRECTLY)
    // use [event.target.name] to specify the name of the input
    // if, for instance, input's name is "Last Name" then event.target.value will be set as Last Name
    setCourse(updatedCourse);
  }

  function formIsValid() {
    const _errors = {} // init empty object

    if(!course.title) _errors.title = "Title is required";
    if(!course.authorId) _errors.authorId = "Author Id is required";
    if(!course.category) _errors.category = "Category is required";    
    
    setErrors(_errors); // set the errors in state to errors (pass this as props to <Courseform />)
    return Object.keys(_errors).length === 0; // Form is valid if errors object has no values
}

  function handleSubmit(event) {
    event.preventDefault();
    if(!formIsValid()) return;
    saveCourse(course);
  }

  return (
    <>     
      <h2>Manage Course</h2>
      <CourseForm
        authors={authors}
        errors={errors}
        course={course}
        onSubmit={handleSubmit}
        onInputChanged={handleChange}
      />
    </>
  );
};

export default ManageCoursePage;
