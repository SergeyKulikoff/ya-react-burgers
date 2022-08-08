import * as config from '../config';
import { setCookie, delCookie } from '../utils/cookie';

export const checkResponse = res => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export const registerRequest = ({ email, password, name }) => {
	return fetch(config.registerUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify({ email, password, name })
	})
		.then(checkResponse);
};

export const loginRequest = ({ email, password }) => {
	return fetch(config.loginUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		// body: JSON.stringify({ email: email, password }),
		body: JSON.stringify({ email, password }),
	})
		.then(checkResponse);
};

export const refreshTokenRequest = () => {
	return fetch(config.tokenUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken')
		}),
	})
		.then(checkResponse);
};

export const logoutRequest = () => {
	return fetch(config.logoutUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken')
		}),
	})
		.then(checkResponse);
};

export const getUserRequest = token => {
	return fetchWithRefreshToken(() => {
		return getUserFetch(config.userUrl, 'GET', token);
	})
};

let cash = null;
const fetchWithRefreshToken = callback => {
	if (cash) {
		return cash.then(() => {
			return callback()
		})
	}
	return callback()
		.then(res => checkResponse(res))
		.catch(res => {
			console.log(res)
			return res.json()
				.then((err) => {
					if (err?.message === 'jwt expired') {
						console.log('fetchWithRefreshToken');
						if (!cash) {
							cash = refreshTokenRequest()
								.then(res => {
									localStorage.setItem('refreshToken', res.refreshToken);
									const authToken = res.accessToken.split('Bearer ')[1];
									setCookie('token', authToken);
								})
						}

						return cash.then(() => {
							return callback().then(res => checkResponse(res))
						});
					} else {
						delCookie('token');
						localStorage.removeItem('refreshToken');

						return Promise.reject(err)
					}
				})
		});
};

const getUserFetch = (url, method, authToken) => {
	return fetch(url, {
		method: method,
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			Authorization: 'Bearer ' + authToken
		}
	})
};

export const updateUserRequest = (params) => {
	return fetchWithRefreshToken(() => {
		return patchUserFetch(config.userUrl, 'PATCH', params);
	}).then(checkResponse);
};

const patchUserFetch = (url, method, params) => {
	const authToken = localStorage.getItem('accessToken');
	return fetch(url, {
		method: method,
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			Authorization: 'Bearer ' + authToken
		},
		body: JSON.stringify(params)
	})
};
