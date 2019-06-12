import { combineReducers } from 'redux';
import wallet from './wallet';
import booking from './booking';
import content from './content';
import route from './route';

const rootReducer = combineReducers({
	wallet,
	booking,
	content,
	route,
});

export default rootReducer;