import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import fetchServices from '../reducers/servicesReducer';

export default combineReducers({
	services: fetchServices,
	form: reduxFormReducer
});
