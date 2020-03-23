import api from '../config/api';
import { FETCH_SERVICES } from './types';

export const fetchServices = () => async dispatch => {
	const response = await api.get('/services');

	dispatch({
		type: FETCH_SERVICES,
		payload: response.data
	});
};
