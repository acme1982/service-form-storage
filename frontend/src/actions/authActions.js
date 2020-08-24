import {
	USER_LOADING,
	USER_LOADED,
	LOGIN_SUCCESS,
	REGISTER_USER,
	REGISTER_SUCCESS,
	AUTH_ERROR,
	REGISTER_FAIL,
	LOGIN_FAIL,
	LOGOUT,
} from './types';
import api from '../apis/api';
import { getError } from '../actions/errorActions';

// LOAD USER. TODO: redirect on successful login.
export const loadUser = () => async (dispatch, getState) => {
	// User is loading.
	dispatch({ type: USER_LOADING });

	// GET user details if logged in.
	try {
		const response = await api.get('/users/user', configToken(getState));
		// If User have token return user as payload.
		dispatch({
			type: USER_LOADED,
			payload: response.data,
		});
	} catch (err) {
		dispatch(
			getError(err.response.data.message, err.response.status, 'AUTH_ERROR')
		);
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

// LOGIN
export const attemptLogin = ({ email, password }) => async (
	dispatch,
	getState
) => {
	// Send as JSON to endpoint.
	const body = JSON.stringify({ email, password });
	try {
		const response = await api.post(
			'/users/login',
			body,
			configToken(getState)
		);
		dispatch({
			type: LOGIN_SUCCESS,
			payload: response.data,
		});
	} catch (err) {
		dispatch(
			getError(err.response.data.message, err.response.status, 'LOGIN_ERROR')
		);
		dispatch({
			type: LOGIN_FAIL,
		});
	}
};

// LOGOUT
export const logout = () => (dispatch) => {
	dispatch({
		type: LOGOUT,
	});
};

export const configToken = (getState) => {
	// GET token from localStorage
	const token = getState().auth.token;
	// SET HEADERS
	const config = {
		headers: {
			'Content-type': 'application/json',
		},
	};
	if (token) {
		config.headers['auth-token'] = token;
	}

	return config;
};
