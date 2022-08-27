import { TMessage } from "../../types";

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_CLOSE: 'WS_CONNECTION_CLOSE' = 'WS_CONNECTION_CLOSE';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';

export type _IStartAction = { type: typeof WS_CONNECTION_START, payload: string }
export type _ICloseAction = { type: typeof WS_CONNECTION_CLOSE }
export type _ISuccessAction = { type: typeof WS_CONNECTION_SUCCESS }
export type _IErrorAction = { type: typeof WS_CONNECTION_ERROR, payload: WebSocketEventMap | null }
export type _IClosedAction = { type: typeof WS_CONNECTION_CLOSED }
export type _IGetAction = { type: typeof WS_GET_MESSAGE, payload: TMessage }
export type _ISendAction = { type: typeof WS_SEND_MESSAGE, payload: string }

export type TWSActions =
	| _IStartAction
	| _ISuccessAction
	| _IErrorAction
	| _IClosedAction
	| _ICloseAction
	| _IGetAction
	| _ISendAction;

export type TWSActionNames = {
	[key in TWSActions['type']]: key
}