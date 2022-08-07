//Components
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';


//Route
import { Route, Switch } from 'react-router-dom';
import { LoginPage } from '../../pages/login/login';
import { RegisterPage } from '../../pages/register/register';
import { ForgotPasswordPage } from '../../pages/forgot-password/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password/reset-password';
import { ProfilePage } from '../../pages/profile/profile';
import { ProtectedRoute } from '../protected-route/protected-route';
import IngredientDetails from '../ingredient-details/ingredient-details';


//Style
import style from './app.module.css';

export default function App() {
	return (
		<div className="App">
			<AppHeader />
			<Switch >
				<Route path='/' exact={true}>
					<main>
						<p className="text text_type_main-large">Соберите бургер</p>
						<div className={style.container}>
							<BurgerIngredients />

							<BurgerConstructor />
						</div>
					</main>
				</Route>

				<Route path='/login' exact={true}>
					<LoginPage />
				</Route>

				<Route path='/register' exact={true}>
					<RegisterPage />
				</Route>

				<Route path='/forgot-password' exact={true}>
					<ForgotPasswordPage />
				</Route>

				<Route path='/reset-password' exact={true}>
					<ResetPasswordPage />
				</Route>

				<ProtectedRoute path='/profile' exact={true}>
					<ProfilePage />
				</ProtectedRoute>

				{/* <Route path='/ingredients/:id' exact={true}>
					<IngredientDetails />
				</Route> */}
			</Switch>
		</div >
	);
}

