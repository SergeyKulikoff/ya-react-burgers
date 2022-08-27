import { Dispatch, AnyAction } from 'redux'
import { TWSActionNames, TWSActions, wsConectionClosed, wsConectionError, wsConectionSuccess, wsGetMessage } from '../actions';
import { WS_CONNECTION_START, WS_SEND_MESSAGE } from '../constants/actionTypes';

export const socketMiddleware = () => {
	return (store: { dispatch: Dispatch<TWSActions> }) => {
		let socket: any = null;

		return (next: (i: AnyAction) => void) => (action: TWSActions) => {
			const { dispatch } = store;

			if (action.type === WS_CONNECTION_START) {
				socket = new WebSocket(action.payload)
			}

			if (socket) {
				socket.onopen = (event: WebSocketEventMap) => {
					dispatch(wsConectionSuccess(event))
				};

				socket.onerror = (event: WebSocketEventMap) => {
					dispatch(wsConectionError(event))
					console.log(event)
				};

				socket.onmessage = (event: WebSocketEventMap & { data: string }) => {
					const { data } = event;

					const parsedData = JSON.parse(data);
					dispatch(wsGetMessage(parsedData))
				};

				socket.onclose = (event: WebSocketEventMap) => {
					dispatch(wsConectionClosed(event))
				};

				if (action.type === WS_SEND_MESSAGE) {
					const message = action.payload;
					socket.send(JSON.stringify(message))
				}
			}

			next(action)
		}
	}
};