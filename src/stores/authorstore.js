import {EventEmitter} from 'events';
import dispatcher from '../appDispatcher';
import actionTypes from '../actions/actionTypes';

const CHANGE_EVENT = "change";

let _authors = [];

class AuthorStore extends EventEmitter {
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback)
    }

    emitChange(callback) {
        this.emit(CHANGE_EVENT, callback)
    }

    getAuthors() {
        return _authors;
    }
}

// must instantiate store & export
const store = new AuthorStore();

dispatcher.register(action => {
    switch(action.actionType) {
        case actionTypes.LOAD_AUTHORS:
            _authors = action.authors;
            store.emitChange(); // anytime the store changes the emitChange has to be invoked
        break;  
        default:
        // do nothing on default
    }
})

export default store;