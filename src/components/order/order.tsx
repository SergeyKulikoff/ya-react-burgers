import React from 'react';
import css from './order.module.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from '../../types';
import { getOrder } from '../../services/actions/order';
import { formatDate } from '../../utils/format-date';

export function Order() {
	const dispatch = useAppDispatch();
	const { order, orderRequest, orderFailed } = useAppSelector(state => state.orderReducer);

	const { ingredient } = useAppSelector(state => state.fetchData);
	const { id } = useParams<{ id: string }>();

	const [orderIngredients, setOrderIngredients] = useState<TIngredient[] | null>(null);
	const [price, setPrice] = useState(0);

	const getStatusColor = (status: string) => status === 'done' ? '#00CCCC' : '#FFFFFF';
	useEffect(() => {
		dispatch(getOrder(id))
	}, [dispatch, id]);


	const getStatus = (status: string) => {
		if (status === 'done') {
			return 'Выполнен'
		} else if (status === 'created') {
			return 'Создан'
		} else if (status === 'pending') {
			return 'Готовится'
		}
		return false;
	};

	useEffect(() => {
		if (ingredient.length) {
			let totalPrice = 0;
			let bun = 0;
			order?.ingredients?.forEach((ingredients: string) => {
				let targetIngredient = ingredient.filter(item => item['_id'] === ingredients)[0];
				if (targetIngredient.type === 'bun' && !bun) {
					totalPrice += 2 * targetIngredient.price;
					bun = 1
				}
				if ((targetIngredient.type !== 'bun'))
					totalPrice += targetIngredient.price
			});
			setPrice(totalPrice);

			let orderIngredientsSet = new Set();
			let orderIngredientsList: TIngredient[] = [];
			order?.ingredients?.forEach(item => orderIngredientsSet.add(item));
			orderIngredientsSet.forEach(value => orderIngredientsList.push(ingredient.filter(ingredient => ingredient['_id'] === value)[0]));
			orderIngredientsList.forEach(item => {
				item.type === 'bun'
					? item.count = 2
					: item.count = order?.ingredients.filter(ingredient => ingredient === item['_id']).length
			});
			setOrderIngredients(orderIngredientsList)
		}

	}, [ingredient, order]);

	if (orderFailed) {
		return <p className="text text_type_main-default text_color_inactive">Произошла ошибка при получении данных о заказе</p>
	} else if (orderRequest) {
		return <p className="text text_type_main-default text_color_inactive">Загрузка заказа...</p>
	} else {
		return (
			(order) &&
			<section className={css.orderInfo}>
				<p className={css.orderHeader + " text text_type_digits-default pt-4"}>#{order.number}</p>
				<p className="text text_type_main-medium pt-10">{order.name}</p>
				<p className="text text_type_main-default pt-2">
					<span style={{ color: getStatusColor('done') }}>{getStatus(order.status)}</span>
				</p>
				<p className="text text_type_main-medium pt-15 pb-4">Состав:</p>
				<div className={css.orderWrapper + ' pr-2'}>
					{
						Boolean(orderIngredients) &&
						orderIngredients?.map((ingredient, i) => {
							return <div key={i} className={css.order + ' mt-4 pb-2'}>
								<div className={css.info}>
									<div className={css.imageWrapper + ' mr-4'}>
										<img className={css.image} src={ingredient.image_mobile} alt="" />
									</div>
									<div className={css.name + ' text text_type_main-default'}>
										{ingredient.name}
									</div>
								</div>

								<div className={css.price + ' text text_type_digits-default'}>
									<span className="pr-2">
										{(ingredient.count && ingredient.count > 1) && ingredient.count + ' x '}
										{ingredient.price}
									</span>
									<CurrencyIcon type="primary" />
								</div>
							</div>
						})
					}
				</div>
				<div className={css.footer + ' mt-10 pr-2 pb-10'}>
					<p className="text text_type_main-default text_color_inactive">{formatDate(order.createdAt)}</p>
					<div className={css.price + ' text text_type_digits-default'}>
						<span className="pr-2">
							{price}
						</span>
						<CurrencyIcon type="primary" />
					</div>
				</div>
			</section>
		)
	}
}