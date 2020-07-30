import {EventEmitter} from 'events';
import dispatcher from '../appDispatcher';
import actionTypes from '../actions/actionTypes';

const CHANGE_EVENT = "change";

let _courses = [];

// helper methods that deal with event listeners & emit event change events
class CourseStore extends EventEmitter {
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback)
    }

    emitChange(callback) {
        this.emit(CHANGE_EVENT, callback)
    }

    getCourses() {
        return _courses;
    }

    getCourseBySlug(slug) {
        return _courses.find(course => course.slug === slug);
    }
}

// must instantiate store & export
const store = new CourseStore();

dispatcher.register(action => {
    switch(action.actionType) {
        case actionTypes.CREATE_COURSE:
            _courses.push(action.course);
            store.emitChange(); // anytime the store changes the emitChange has to be invoked
        break;
        case actionTypes.UPDATE_COURSE:
            _courses = _courses.map(course => course.id === action.course.id ? action.course : course );
            store.emitChange(); // anytime the store changes the emitChange has to be invoked
        break;  
        case actionTypes.DELETE_COURSE:
            _courses = _courses.filter(course => course.id !== parseInt(action.id, 10) );
            store.emitChange(); // anytime the store changes the emitChange has to be invoked
        break;                
        case actionTypes.LOAD_COURSES:
            _courses = action.courses;
            store.emitChange(); // anytime the store changes the emitChange has to be invoked
        break;        
        default:
        // do nothing on default
    }
})

export default store;