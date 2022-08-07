//Components
import {
	Logo,
	ProfileIcon,
	ListIcon,
	BurgerIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

//Style
import style from './app-header.module.css'

import { NavLink, useLocation } from 'react-router-dom';


export default function AppHeader() {
	const { pathname } = useLocation();

	return (
		<header className={style.header} >
			<div className={style.wrapper}>
				<nav className={style.menu}>
					<div className={style.blockLinks}>
						<NavLink to='/' exact={true} className={style.link}>
							<BurgerIcon type={pathname === '/' ? "primary" : "secondary"} />
							<p className="text text_type_main-default ml-2">Конструктор</p>


						</NavLink>

						<a href="#" className={`${style.link} ${style.active} p-4`}>
							<ListIcon type="secondary" />
							<p className={`text text_type_main-default ml-2 ${style.active}`}>Лента заказов</p>
						</a>

						<NavLink to='/' exact={true} className={style.logo}>
							<Logo />
						</NavLink>
					</div>



					<NavLink to='/profile' exact={true} className={style.link}>
						<ProfileIcon type={pathname === '/profile' ? "primary" : "secondary"} />
						<p className={`text text_type_main-default ml-2 ${style.active}`}>Личный кабинет</p>
					</NavLink>
				</nav>
			</div>
		</header>
	)
}

