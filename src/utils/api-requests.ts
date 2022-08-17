import * as config from '../config';
import { setCookie, delCookie } from './cookie';
import { TUser, TUserRequest, TError } from '../types'

export const checkResponse = (res: Response) => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export const registerRequest = ({ email, password, name }: TUser) => {
	return fetch(config.registerUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify({ email, password, name })
	})
		.then(checkResponse);
};

export const loginRequest = ({ email, password }: TUser) => {
	return fetch(config.loginUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
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

export const getUserRequest = (token: string) => {
	return fetchWithRefreshToken(() => {
		return getUserFetch(config.userUrl, 'GET', token);
	})
};

let cash: Promise<void> | null = null;

const fetchWithRefreshToken = (callback: () => Promise<any>) => {
	if (cash) {
		return cash.then(() => {
			return callback()
		})
	}
	return callback()
		.then(res => checkResponse(res))
		.catch((res: Response) => {
			console.log(res)
			return res.json()
				.then((err: TError) => {
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

const getUserFetch = (url: string, method: string, authToken: string) => {
	return fetch(url, {
		method: method,
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			Authorization: 'Bearer ' + authToken
		}
	})
};

export const updateUserRequest = (params: TUserRequest) => {
	return fetchWithRefreshToken(() => {
		return patchUserFetch(config.userUrl, 'PATCH', params);
	}).then(checkResponse);
};

const patchUserFetch = (url: string, method: string, params: Record<string, any> | string) => {
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
