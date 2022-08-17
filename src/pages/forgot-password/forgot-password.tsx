import { SyntheticEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Logo, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './forgot-password.module.css';
import * as config from "../../config";
import { checkResponse } from "../../utils/api-requests";
import { useAppSelector } from '../../hooks/hooks';

export const ForgotPasswordPage = () => {
	const [email, setEmail] = useState('');
	let history = useHistory();
	const authorized = useAppSelector(state => state.authReducer.authorized);

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		fetch(config.ForgotUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify({ 'email': email })
		})
			.then(res => {
				history.replace({ pathname: '/reset-password' });
				return checkResponse(res);
			})
			.catch(error => {
				console.log(error);
				alert('Error ' + error + ' while connecting to Api');
			});
	}

	if (authorized) {
		history.replace({ pathname: '/' });
		return null;
	} else {
		return (
			<div className={style.forgot_container}>
				<Logo />
				<form className={style.forgot_form} onSubmit={handleSubmit}>
					<h3 className="text text_type_main-medium">Восстановление пароля</h3>
					<Input type={"email"} placeholder={"Укажите e-mail"} onChange={(event) => setEmail(event.target.value)} value={email} />

					{/*// @ts-ignore*/}
					<Button type="primary" size="small" >
						<p className="text text_type_main-default">Восстановить</p>
					</Button>
				</form>
				<div className={style.forgot_text}>
					<span className="text text_type_main-default text_color_inactive">Вспомнили пароль?
						<Link to="/login" className="text text_type_main-default pl-2">Войти</Link>
					</span>
				</div>
			</div>
		);
	}
}
