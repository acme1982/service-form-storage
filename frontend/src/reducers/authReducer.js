import {
	USER_LOADED,
	USER_LOADING,
	LOGIN_SUCCESS,
	REGISTER_SUCCESS,
	REGISTER_USER,
	AUTH_ERROR,
	REGISTER_FAIL,
	LOGIN_FAIL,
	LOGOUT,
} from '../actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: false,
	isLoading: false,
	user: {},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case USER_LOADING:
			return { ...state, isLoading: true };
		case USER_LOADED:
			return {
				...state,
				isLoading: false,
				isAuthenticated: true,
				user: action.payload,
			};
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				isLoading: false,
			};
		case AUTH_ERROR:
		case REGISTER_FAIL:
		case LOGOUT:
		case LOGIN_FAIL:
			localStorage.removeItem('token');
			return { ...state, token: null, isAuthenticated: false, user: {} };
		default:
			return state;
	}
};
