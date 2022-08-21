//React-hook
import { SyntheticEvent, useState } from 'react';

//Router
import { Link } from 'react-router-dom';

//Components
import { Logo, Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

//Actions
import { registerAction } from '../../services/actions/auth';

//Style
import style from './register.module.css';
import { useAppDispatch } from '../../hooks/hooks';

export const RegisterPage = () => {
	const dispatch = useAppDispatch();
	const [formData, setFormData] = useState({ name: '', email: '', password: '' });

	const fieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		})
	};

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		dispatch(registerAction(formData))
	};

	return (
		<>
			<div className={style.reg_container}>
				<Logo />
				<form className={style.reg_form} onSubmit={handleSubmit}>
					<h3 className="text text_type_main-medium" >Регистрация</h3>
					<Input name={'name'} value={formData.name} onChange={fieldChange} type={"text"} placeholder={"Имя"} />
					<Input name={'email'} value={formData.email} onChange={fieldChange} type={"email"} placeholder={"E-mail"} />
					<PasswordInput onChange={fieldChange} value={formData.password} name={'password'} />

					{/*// @ts-ignore*/}
					<Button type="primary" size="small">
						<p className="text text_type_main-default">Зарегистрироваться</p>
					</Button>
				</form>
			</div>
			<div className={style.reg_text}>
				<span className="text text_type_main-default text_color_inactive">Уже зарегистрированы?
					<Link to="/login" className="text text_type_main-default pl-2">Войти</Link>
				</span>
			</div>
		</>
	)
}
