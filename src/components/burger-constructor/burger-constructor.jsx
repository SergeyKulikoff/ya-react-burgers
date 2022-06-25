//Components
import {
	ConstructorElement,
	Button,
	CurrencyIcon,
	DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

//Style
import style from './burger-constructor.module.css'

const BurgerConstructor = (props) => {

	return (
		<section>

			{props.bun.map((elem, index) => {
				if (index !== 1) {
					return (
						<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} key={index + 1}>
							<div className={style.top} key={index + 2}>
								<ConstructorElement
									key={index}
									type="top"
									isLocked={true}
									text={`${elem.name} (верх)`}
									price={elem.price}
									thumbnail={elem.image}
								/>
							</div>


							{<div className={style.listIngredients}>
								{props.main.concat(props.sauce).map((elem, index) => {
									return (
										<div className={style.item} key={index}>
											<DragIcon />
											<ConstructorElement
												key={elem.id}
												text={elem.name}
												price={elem.price}
												thumbnail={elem.image}
											/>
										</div>
									)
								})}

							</div>}

							<div className={style.bottom} key={index + 1}>
								<ConstructorElement
									key={index + 3}
									type="bottom"
									isLocked={true}
									text={`${elem.name} (низ)`}
									price={elem.price}
									thumbnail={elem.image}
								/>
							</div>
						</div>
					)
				}
			})}

			<div className={style.checkout}>
				<div className={style.totalprice}>
					<span>610</span>
					<CurrencyIcon type="primary " className="mr-2" />
				</div>

				<Button type="primary" size="large">
					Оформить заказ
				</Button>
			</div>
		</section>

	)
}

export default BurgerConstructor