//Router
import { NavLink, useLocation } from "react-router-dom";

//Actions
import { logoutAction } from "../../services/actions/auth";

//Style
import style from "./profile.module.css"
import { useAppDispatch } from "../../hooks/hooks";

export function Links() {
	const { pathname } = useLocation();
	const dispatch = useAppDispatch();

	const handleExit = () => {
		dispatch(logoutAction());
	}

	return (
		<nav className={style.nav_list + ' pt-5 mb-20'}>
			<NavLink exact to="/profile"
				className={style.link + " text text_type_main-medium text_color_inactive"}
				activeClassName={style.link_active}>
				<span className='ml-2 pu-5 pb-5'>Профиль</span>
			</NavLink>

			<NavLink exact to="/profile/orders"
				className={style.link + " text text_type_main-medium text_color_inactive"}
				activeClassName={style.link_active}>
				<span className='ml-2 pu-5 pb-5'>История заказов</span>
			</NavLink>

			<NavLink exact to="/login"
				className={style.link + " text text_type_main-medium text_color_inactive"}
				activeClassName={style.link_active}>
				<span className='ml-2 pu-5 pb-5' onClick={handleExit}>Выход</span>
			</NavLink>

			<div className="pt-20">
				<p className="text text_type_main-default text_color_inactive">В этом разделе Вы можете</p>
				{pathname === '/profile' && (
					<p className="text text_type_main-default text_color_inactive">изменить свои персональные данные</p>
				)}
				{pathname === '/profile/orders' && (
					<p className="text text_type_main-default text_color_inactive">просмотреть свою историю заказов</p>
				)}
			</div>
		</nav>
	)
}
