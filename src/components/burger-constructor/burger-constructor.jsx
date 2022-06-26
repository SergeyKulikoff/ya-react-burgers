import { useEffect, useState } from 'react';

//Components
import {
	ConstructorElement,
	Button,
	CurrencyIcon,
	DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

//Types
import PropTypes from 'prop-types';

//Style
import style from './burger-constructor.module.css'

export default function BurgerConstructor({ ingredients }) {
	const bun = ingredients.filter(elem => elem.type === 'bun');
	const sauce = ingredients.filter(elem => elem.type === 'sauce');
	const main = ingredients.filter(elem => elem.type === 'main');

	const [isActive, setOpenModal] = useState(false);

	let toggleShowHandler = () => {
		setOpenModal(!isActive)
	}

	return (
		<>
			<section>
				{bun.map((elem, index) => {
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
									{main.concat(sauce).map((elem, index) => {
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
								</div>
								}

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

					<Button type="primary" size="large" onClick={toggleShowHandler}>
						Оформить заказ
					</Button>
				</div>
			</section>

			{isActive ?

				<Modal
					isOpen={isActive}
				>
					<OrderDetails />
				</Modal>

				: null}
		</>
	)
}

BurgerConstructor.propTypes = {
	ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
}