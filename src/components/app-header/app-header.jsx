//Components
import {
	Logo,
	ProfileIcon,
	ListIcon,
	BurgerIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

//Style
import style from './app-header.module.css'

export default function AppHeader() {
	return (
		<header className={style.header} >
			<div className={style.wrapper}>
				<nav className={style.menu}>
					<div className={style.blockLinks}>
						<a href="#" className={style.link}>
							<BurgerIcon type="primary" />
							<p className="text text_type_main-default ml-2">Конструктор</p>
						</a>

						<a href="#" className={`${style.link} ${style.active} p-4`}>
							<ListIcon type="secondary" />
							<p className={`text text_type_main-default ml-2 ${style.active}`}>Лента заказов</p>
						</a>
					</div>

					<a href="#">
						<Logo />
					</a>

					<a href="#" className={style.link}>
						<ProfileIcon type="secondary" />
						<p className={`text text_type_main-default ml-2 ${style.active}`}>Личный кабинет</p>
					</a>
				</nav>
			</div>
		</header>
	)
}

