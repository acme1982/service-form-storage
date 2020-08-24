import { GET_ERROR, CLEAR_ERRORS } from '../actions/types';

//INITIATE STATE
const initialState = {
	message: {},
	status: {},
	id: null,
};
// GET/SHOW ERRORS FROM SERVER
export default (state = initialState, action) => {
	switch (action.type) {
		case GET_ERROR:
			return {
				message: action.payload.message,
				status: action.payload.status,
				id: action.payload.id,
			};
		case CLEAR_ERRORS:
			return {
				message: {},
				status: {},
				id: null,
			};
		default:
			return state;
	}
};
