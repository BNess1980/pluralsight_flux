import React from "react";
import TextInput from './common/textinput';
import Select from './common/select';
import PropTypes from "prop-types";

const CourseForm = (props) => {

  return (
    <>
    <form onSubmit={props.onSubmit}>
      
      <TextInput id="title" name="title" label="Title" onChange={props.onInputChanged} value={props.course.title} error={props.errors.title} />
      
      <Select id="author" name="authorId" label="Author" authors={props.authors} onChange={props.onInputChanged} error={props.errors.authorId} />

      <TextInput id="category" name="category" label="Category" onChange={props.onInputChanged} value={props.course.category} error={props.errors.category} />
      
      <input type="submit" value="Save" className="btn btn-primary" />
      
    </form>
    </>
  );
}

CourseForm.propTypes = {
  course: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  authors:PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired
}

export default CourseForm;
