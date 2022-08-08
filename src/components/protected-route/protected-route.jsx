//Redux
import { useSelector } from 'react-redux';

//Route
import { Redirect, Route, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ children, ...rest }) => {
	const authorized = useSelector(state => state.authReducer.authorized);
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
