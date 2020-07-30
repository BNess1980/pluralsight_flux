import dispatcher from "../appDispatcher";
import * as courseAPI from "../api/courseApi";
import actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import * as  authorAPI from "../api/authorApi";

export function saveCourse(course) {
  // Action creator Tells dispatcher to notify all stores of data change

  console.log(course);

  let action = "";
  let toastSaveMsg = "";

  if (course.id !== null) {
    action = actionTypes.UPDATE_COURSE;
    toastSaveMsg = "Course Updated";
  } else {
    action = actionTypes.CREATE_COURSE;
    toastSaveMsg = "Course Created";
  }

  courseAPI.saveCourse(course).then(
    (savedCourse) => {
      dispatcher.dispatch({
        // Action
        actionType: action,
        course: savedCourse,
      });

      toast.success(toastSaveMsg);
    },
    (error) => {
      toast.error("Error in Saving Course: " + error);
    }
  );
}

export function deleteCourse(id) {
  courseAPI.deleteCourse(id).then(
    (deletedCourse) => {
      dispatcher.dispatch({
        actionType: actionTypes.DELETE_COURSE,
        id: id,
      });
      toast.success("Course Deleted!");
    },
    (error) => {
      toast.error("Error in Deleting Course: " + error);
    }
  );
}

export function loadCourses() {
  courseAPI.getCourses().then((courses) => {
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_COURSES,
      courses: courses,
    });
  });
}

export function loadAuthors() {
  authorAPI.getAuthors().then((authors) => {
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_AUTHORS,
      authors: authors
    });
  });  
}