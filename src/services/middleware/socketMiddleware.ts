import { Middleware, MiddlewareAPI } from 'redux'
import { AppDispatch, RootState } from '../../types';
import { TWSActionNames } from '../actions';
import rootReducer from '../reducers/rootReducer';
import * as wsAction from '../actions/index';

export const socketMiddleware = (wsActions: TWSActionNames): Middleware<{}, ReturnType<typeof rootReducer>> => {
	return (store: MiddlewareAPI<AppDispatch, RootState>) => {
		let socket: WebSocket | null = null;

		return (next) => (action) => {
			const { dispatch } = store;
			const { wsConectionClosed, wsConectionError, wsConectionSuccess, wsGetMessage } = wsAction;

			if (action.type === wsActions.WS_CONNECTION_START) {
				socket = new WebSocket(action.payload)
			}

			if (socket) {
				socket.onopen = (event: Event) => {
					dispatch(wsConectionSuccess(event))
				};

				socket.onerror = (event: Event) => {
					dispatch(wsConectionError(event))
					console.log(event)
				};

				socket.onmessage = (event: Event & { data: string }) => {
					const { data } = event;

					const parsedData = JSON.parse(data);
					dispatch(wsGetMessage(parsedData))
				};

				socket.onclose = (event: Event) => {
					dispatch(wsConectionClosed(event))
				};

				if (action.type === wsActions.WS_SEND_MESSAGE) {
					const message = action.payload;
					socket.send(JSON.stringify(message))
				}
			}

			next(action)
		}
	}
};