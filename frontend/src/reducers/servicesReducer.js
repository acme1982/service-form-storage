import { FETCH_SERVICES } from '../actions/types';
import _ from 'lodash';

export default (state = {}, action) => {
	switch (action.type) {
		case FETCH_SERVICES:
			return { ...state, ..._.mapKeys(action.payload.data, '_id') };
		default:
			return state;
	}
};
