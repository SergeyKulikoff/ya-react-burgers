//Redux
import { FC } from 'react';

//Route
import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
	const authorized = useAppSelector(state => state.authReducer.authorized);
	const location = useLocation();

	if (authorized) {
		return (
			<Route {...rest}>
				{children}
			</Route>
		)
	} else {
		return (
			<Redirect
				to={{
					pathname: '/login',
					state: { from: location }
				}}
			/>)
	}

};
