//React-hook
import { SyntheticEvent, useEffect, useState } from "react";

//Router
import { Route, Switch } from "react-router-dom";

//Components
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Links } from "./links";

//Actions
import { getUserAction, updateUserAction } from "../../services/actions/auth";

//Style
import style from "./profile.module.css";
import { TUser } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

export const ProfilePage = () => {
	const dispatch = useAppDispatch();
	const emptyState: TUser = {
		name: "",
		email: "",
		password: ""
	};

	const [defaultState, setDefaultState] = useState(emptyState);
	const [state, setState] = useState(emptyState);
	const user = useAppSelector(state => state.authReducer.user);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setState({
			...state,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		dispatch(updateUserAction(state));
	};

	const handleReset = (e: SyntheticEvent) => {
		e.preventDefault();
		setState(defaultState);
	};

	useEffect(() => {
		setState(user);
		setDefaultState({
			...user,
			...{ password: '' }
		});
	}, [user]);

	useEffect(() => {
		dispatch(getUserAction())
	}, []);

	return (
		<div className={style.profile_main + " pt-20"} >
			<div className={style.profile_col}>
				<Links />
			</div>
			<div className={style.profile_col}>
				<Switch>
					<Route path="/profile" exact={true}>
						<form className={style.profile_form} onSubmit={handleSubmit}>
							<Input
								type={"text"}
								placeholder={"Имя"}
								onChange={handleInputChange}
								icon={"EditIcon"}
								value={state.name || ''}
								name={"name"}
								size={"default"}
							/>
							<Input
								type={"text"}
								placeholder={"Email"}
								onChange={handleInputChange}
								icon={"EditIcon"}
								name={"email"}
								value={state.email}

							/>
							<Input
								type={"password"}
								placeholder={"Пароль"}
								onChange={handleInputChange}
								icon={"EditIcon"}
								name={"password"}
								value={state.password || ''}
								size={"default"}
							/>

							{/*// @ts-ignore*/}
							<Button type="primary" size="small" >
								<p className="text text_type_main-default">Сохранить</p>
							</Button>

							{/*// @ts-ignore*/}
							<Button type="secondary" size="small" onClick={handleReset}>
								<p className="text text_type_main-default">Отмена</p>
							</Button>
						</form>
					</Route>
				</Switch>
			</div>
		</div>
	);
}
