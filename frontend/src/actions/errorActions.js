import { GET_ERROR, CLEAR_ERRORS } from './types';

// Get
export const getError = (message, status, id) => {
	return {
		type: GET_ERROR,
		payload: { message, status, id },
	};
};

// Clear all errors.
export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS,
	};
};
