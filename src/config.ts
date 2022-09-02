export const protHttp: string = 'https://';
export const protWss: string = 'wss://';

export const domain: string = 'norma.nomoreparties.space';
export const apiUrl: string = domain + '/api';

export const getIngredientsUrl: string = protHttp + apiUrl + '/ingredients';
export const createOrderUrl: string = protHttp + apiUrl + '/orders';
export const orderUrl: string = protHttp + apiUrl + '/orders/';

export const ForgotUrl: string = protHttp + apiUrl + '/password-reset';
export const ResetUrl: string = protHttp + apiUrl + '/password-reset/reset';

export const registerUrl: string = protHttp + apiUrl + '/auth/register';

export const loginUrl: string = protHttp + apiUrl + '/auth/login';
export const logoutUrl: string = protHttp + apiUrl + '/auth/logout';
export const tokenUrl: string = protHttp + apiUrl + '/auth/token';
export const userUrl: string = protHttp + apiUrl + '/auth/user';

export const feedsUrl: string = protWss + domain + '/orders/all';
export const feedsUserUrl: string = protWss + domain + '/orders?token=';

