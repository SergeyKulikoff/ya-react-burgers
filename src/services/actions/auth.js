import {
	registerRequest,
	loginRequest,
	refreshTokenRequest,
	logoutRequest,
	getUserRequest,
	updateUserRequest
} from '../../utils/api-requests';

import { setCookie, delCookie, getCookie } from "../../utils/cookie";

import {
	userRegisterSuccess,
	userRegisterFailed,
	userLogin,
	refreshTokenRequestAction,
	refreshTokenSuccesAction,
	refreshTokenFailedAction,
	userLogout,
	userActionRequest,
	userActionSucces,
	userActionFailed,
} from '../actions/index'

export const registerAction = state => {
	return dispatch => {
		registerRequest(state)
			.then(res => {
				if (res && res.success) {
					const authToken = res.accessToken.split('Bearer ')[1];
					setCookie('token', authToken);

					const refreshToken = res.refreshToken;
					localStorage.setItem('refreshToken', refreshToken);
					dispatch(userRegisterSuccess(res.user));
				} else {
					dispatch(userRegisterFailed());
				}
			})
			.catch((err) => {
				console.log(err);
				dispatch(userRegisterFailed());
			});
	}
}

export const loginAction = state => {
	return dispatch => {
		return loginRequest(state)
			.then(res => {
				if (res && res.success) {
					const authToken = res.accessToken.split('Bearer ')[1];
					setCookie('token', authToken);

					const refreshToken = res.refreshToken;
					localStorage.setItem('refreshToken', refreshToken);
					dispatch(userLogin(res.user));
					return res;
				} else {
					console.error(res.message)
				}
			})
			.catch(err => {
				console.error('Error1: ', err);
			});
	};
};

export const refreshTokenAction = () => {
	return dispatch => {
		dispatch(refreshTokenRequestAction());
		refreshTokenRequest()
			.then(res => {
				if (res && res.success) {
					localStorage.setItem('refreshToken', res.refreshToken);
					const authToken = res.accessToken.split('Bearer ')[1];
					setCookie('token', authToken);

					console.log(res)
					delCookie('token');
					dispatch(refreshTokenSuccesAction());
				}
			})
			.catch(err => {
				dispatch(refreshTokenFailedAction());
				console.error('Error2: ', err);
			});
	};
}

export const logoutAction = () => {
	return dispatch => {
		logoutRequest()
			.then(res => {
				if (res && res.success) {
					delCookie('token');
					localStorage.removeItem('refreshToken');
					dispatch(userLogout());
					return true;
				}
			})
			.catch(err => {
				console.error('Error: ', err);
			});
	};
};

export const getUserAction = () => {
	return dispatch => {
		dispatch(userActionRequest());

		return getUserRequest(getCookie('token'))
			.then(res => {
				if (res && res.success) {
					dispatch(userActionSucces(res.user));
				}
			})
			.catch(err => {
				console.log(err)
				dispatch(userActionFailed());
				dispatch(refreshTokenRequestAction());
			});
	};
};

export const updateUserAction = state => {
	return dispatch => {
		dispatch(userActionRequest());
		updateUserRequest({
			email: state.email,
			name: state.name,
			token: getCookie('token')
		})
			.then(res => {
				if (res && res.success) {
					dispatch(userActionSucces(res.user));
				} else {
					dispatch(userActionFailed());
				}
			})
			.catch(err => {
				console.log(err)
				dispatch(userActionFailed());
			});
	}
};



