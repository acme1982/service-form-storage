import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import authReducer from './authReducer';
import errorReducer from './errorReducer';

export default combineReducers({
	form: reduxFormReducer,
	auth: authReducer,
	error: errorReducer,
});
