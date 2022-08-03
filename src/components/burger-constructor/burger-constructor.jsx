//Components
import {
	ConstructorElement,
	Button,
	CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import ListItem from '../list-item/list-item';

//Style
import style from './burger-constructor.module.css';

//React hooks
import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from "react-dnd";

//Actions 
import { ingredientChoose, ingredientDelete, countDecrease, countIncrease, sortIngredients } from '../../services/actions/index';
import { constructorShowModal } from '../../services/actions';
import { getFetchData } from '../../services/actions/ingredients';

import { createOrder, clearOrder } from '../../services/actions/order';


export default function BurgerConstructor() {
	const onClose = useSelector(state => state.isOpen);
	const { bun, contentItems } = useSelector(state => state.fetchData.burgerIngredients);

	const dispatch = useDispatch();

	const handleCheckout = () => {
		let ingredientsArr = [bun.id];

		for (let item of contentItems) {
			ingredientsArr.push(item.id)
		}

		dispatch(createOrder(ingredientsArr));
		dispatch(constructorShowModal());
	}

	const toggleModal = () => {
		dispatch(constructorShowModal());
		dispatch(clearOrder());
	};

	useEffect(() => {
		dispatch(getFetchData());

	}, [dispatch]);

	const [{ canDrop }, dropTarget] = useDrop({
		accept: "card",
		drop(item) {
			dispatch(ingredientChoose(item));
			dispatch(countIncrease(item));
		},
		collect: monitor => ({
			isHover: monitor.isOver(),
			canDrop: monitor.canDrop(),
		})
	});

	const moveItem = useCallback((dragIndex, hoverIndex) => {
		dispatch(sortIngredients(dragIndex, hoverIndex))
	}, [dispatch])

	let opacity, dropMsgCls, column;
	if (canDrop) {
		dropMsgCls = style.drop_msg;
		opacity = 0.5;
		column = style.column_active;
	} else {
		dropMsgCls = style.no_drop_msg;
		opacity = 1;
		column = style.column;
	}

	const totalPrice = (bun, items) => {
		let summ = bun ? bun.price * 2 : 0;
		if (items) items.map(itm => summ += itm.price);
		return summ;
	}

	return (
		<>
			<section ref={dropTarget} className={column} style={{ opacity }}>
				<div className={dropMsgCls}>
					Поместите сюда ингредиент для создания заказа
				</div>

				{bun &&
					<div className="ml-15">
						<ConstructorElement
							text={bun.name + " (Верх)"}
							isLocked={true}
							price={bun.price}
							thumbnail={bun.image}
							type="top"
						/>
					</div>
				}

				<div className={style.listIngredients}>
					<ul>
						{contentItems && contentItems.map((item, index) => {
							const deleteIngredient = () => {
								dispatch(ingredientDelete(item.productId))
								dispatch(countDecrease(item))
							}

							return (
								<ListItem
									key={item.productId}
									item={item}
									isLocked={false}
									deleteFunc={deleteIngredient}
									moveFunc={moveItem}
									index={index}
								/>
							)
						})}
					</ul>
				</div>

				{bun &&
					<div className="ml-15">
						<ConstructorElement
							text={bun.name + " (Низ)"}
							isLocked={true}
							price={bun.price}
							thumbnail={bun.image}
							type="bottom"
						/>
					</div>
				}

				<div className={style.checkout}>
					<div className={style.totalprice}>
						<span>{totalPrice(bun, contentItems)}</span>
						<CurrencyIcon type="primary " className="mr-2" />
					</div>
					{bun && <Button type="primary" size="large" onClick={handleCheckout}>Оформить заказ</Button>}
				</div>
			</section>

			{onClose.constructorModal && (
				<Modal
					title=''
					onClose={toggleModal}
				>
					<OrderDetails />
				</Modal>
			)}
		</>
	)
}
