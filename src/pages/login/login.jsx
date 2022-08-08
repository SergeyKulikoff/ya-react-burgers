//React-hook
import { useState } from 'react';

//Router
import { Link, useHistory, useLocation } from 'react-router-dom';

//Components
import { Logo, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

//Actions
import { loginAction } from '../../services/actions/auth';

//Redux
import { useDispatch } from 'react-redux';

//Style
import style from './login.module.css';

export const LoginPage = () => {
	const dispatch = useDispatch();
	let history = useHistory();
	const location = useLocation();

	const [state, setState] = useState({
		email: '',
		password: ''
	});

	const handleChange = e => {
		setState({
			...state,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		dispatch(loginAction(state))
			.then(() => {
				history.replace({ pathname: location.state?.from?.pathname || '/' });
			});
	};

	return (
		<div className={style.login_container}>
			<Logo />
			<form className={style.login_form} onSubmit={handleSubmit}>
				<h3 className="text text_type_main-medium">Вход</h3>
				<Input
					type={"email"}
					placeholder={"E-mail"}
					name={"email"}
					value={state.email}
					onChange={handleChange}
				/>

				<Input
					type={"password"}
					placeholder={"Пароль"}
					size={"default"}
					name={"password"}
					value={state.password}
					onChange={handleChange}
				/>

				<Button type="primary" size="small">
					<p className="text text_type_main-default">Войти</p>
				</Button>
			</form>
			<div className={style.login_text}>
				<span className="text text_type_main-default text_color_inactive">Вы - новый пользователь?
					<Link to="/register" className="text text_type_main-default pl-2">Зарегистрироваться</Link>
				</span>

				<span className="text text_type_main-default text_color_inactive">Забыли пароль?
					<Link to="/forgot-password" className="text text_type_main-default pl-2">Восстановить пароль</Link>
				</span>
			</div>
		</div>
	);
}
