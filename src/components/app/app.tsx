//Components
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';

//Route
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { LoginPage } from '../../pages/login/login';
import { RegisterPage } from '../../pages/register/register';
import { ForgotPasswordPage } from '../../pages/forgot-password/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password/reset-password';
import { ProfilePage } from '../../pages/profile/profile';
import { ProtectedRoute } from '../protected-route/protected-route';
import { FeedPage } from '../../pages/feed/feed';

//Redux
import { useAppDispatch } from '../../hooks/hooks';
//React
import { useEffect } from "react";

//Actions
import { getFetchData } from "../../services/actions/ingredients";

//Style
import style from './app.module.css';
import { OrderPage } from '../../pages/order/order';
import { Order } from '../order/order';

export interface ILocation {
	from: Location;
	background?: Location | any;
	pathname: string;
}

export default function App() {
	const location = useLocation<ILocation>();
	const history = useHistory();
	const background = location.state && location.state.background;

	const dispatch = useAppDispatch()
	const handleModalClose = () => history.goBack();

	useEffect(() => {
		dispatch(getFetchData());

	}, [dispatch]);

	return (
		<div className="App">
			<AppHeader />
			<Switch location={background || location}>
				<Route path='/' exact>
					<main>
						<p className="text text_type_main-large">Соберите бургер</p>
						<div className={style.container}>
							<BurgerIngredients />

							<BurgerConstructor />
						</div>
					</main>
				</Route>

				<Route path='/login' exact>
					<LoginPage />
				</Route>

				<Route path='/register' exact>
					<RegisterPage />
				</Route>

				<Route path='/forgot-password' exact>
					<ForgotPasswordPage />
				</Route>

				<Route path='/reset-password' exact>
					<ResetPasswordPage />
				</Route>

				<Route path='/feed' exact={true} >
					<FeedPage />
				</Route>

				<Route path='/feed/:id' exact={true} >
					<OrderPage />
				</Route>

				<ProtectedRoute path='/profile/orders/:id' exact={true} >
					<OrderPage />
				</ProtectedRoute>

				<ProtectedRoute path='/profile'>
					<ProfilePage />
				</ProtectedRoute>

				<Route path='/ingredients/:id' exact>
					<div className={style.detailbox}>
						<p className={style.title}>Детали ингредиента</p>

						<IngredientDetails />
					</div>
				</Route>
			</Switch>
			{background && (
				<>
					<Route path='/ingredients/:id' exact>
						<Modal onClose={handleModalClose} title={"Детали ингредиента"}>
							<IngredientDetails />
						</Modal>
					</Route>
				</>
			)}

			{background && (
				<>
					<Route
						path='/feed/:id'
						children={
							<Modal onClose={handleModalClose}>
								<Order />
							</Modal>
						}
					/>
				</>
			)}

			{background && (
				<>
					<Route
						path='/profile/orders/:id'
						children={
							<Modal onClose={handleModalClose}>
								<Order />
							</Modal>
						}
					/>
				</>
			)}
		</div >
	);
}

