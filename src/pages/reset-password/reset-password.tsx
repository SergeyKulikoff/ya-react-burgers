import { SyntheticEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Logo, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './reset-password.module.css';
import * as config from "../../config";
import { checkResponse } from "../../utils/api-requests";

import { useAppSelector } from '../../hooks/hooks';

export const ResetPasswordPage = () => {
	const [password, setPassword] = useState('');
	const [token, setToken] = useState('');
	const authorized = useAppSelector(state => state.authReducer.authorized);
	let history = useHistory();

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		console.log(config.ResetUrl)
		fetch(config.ResetUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify({ 'password': password, 'token': token })
		})
			.then(checkResponse)
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
			<div className={style.reset_container}>
				<Logo />
				<form className={style.reset_form} onSubmit={handleSubmit}>
					<h3 className="text text_type_main-medium">Восстановление пароля</h3>
					<Input type={"password"} placeholder={"Введите новый пароль"} value={password}
						onChange={event => setPassword(event.target.value)} />
					<Input type={"text"} placeholder={"Введите код из письма"} value={token}
						onChange={event => setToken(event.target.value)} />

					{/*// @ts-ignore*/}
					<Button type="primary" size="small">
						<p className="text text_type_main-default">Сохранить</p>
					</Button>
				</form>

				<div className={style.reset_text}>
					<span className="text text_type_main-default text_color_inactive">Вспомнили пароль?
						<Link to="/register" className="text text_type_main-default pl-2">Войти</Link>
					</span>
				</div>
			</div>
		);
	}
}
