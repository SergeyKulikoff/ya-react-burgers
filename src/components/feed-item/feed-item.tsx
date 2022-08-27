import { useEffect, useState } from 'react'
import { useAppSelector } from '../../hooks/hooks'
import style from './feed-item.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { formatDate } from '../../utils/format-date';
import { useLocation, Link } from 'react-router-dom'
import { TIngredient, TOrder } from '../../types'

export function FeedItem(props: { order: TOrder; showStatus: boolean }) {
	const showCount = 5;
	const location = useLocation();
	const { order, showStatus } = props;
	const orderNumber = order.number;
	const { ingredient } = useAppSelector(state => state.fetchData);
	const [orderIngredients, setOrderIngredients] = useState<TIngredient[]>([]);
	const [price, setPrice] = useState(0);
	const [images, setImages] = useState<string[]>([]);
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (ingredient.length) {
			let totalPrice = 0;
			let targetIngredients: TIngredient[] = [];
			let bun: boolean = false;
			order?.ingredients?.forEach(e => {
				let targetIngredient = ingredient.filter(item => item['_id'] === e)[0];
				if (targetIngredient?.price) {
					targetIngredients.push(targetIngredient);
					if (targetIngredient.type === 'bun' && !bun) {
						totalPrice += 2 * targetIngredient.price;
						bun = true;
					}
					if ((targetIngredient.type !== 'bun'))
						totalPrice += targetIngredient.price
				}
			});
			setPrice(totalPrice);
			setOrderIngredients(targetIngredients)
		}
	}, [ingredient, order.ingredients]);


	const getStatus = (status: string) => {
		if (status === 'done') return 'Выполнен';
		if (status === 'created') return 'Создан';
		if (status === 'pending') return 'Готовится';
		return false
	}

	useEffect(() => {
		let bun: boolean = false;
		let targetImages: string[] = [];
		orderIngredients.forEach(ingredient => {
			if (ingredient.type === 'bun' && !bun) {
				bun = true;
				targetImages.push(ingredient['image_mobile'])
			}
			if (ingredient.type !== 'bun') {
				targetImages.push(ingredient['image_mobile'])
			}
		});
		setImages(targetImages);
		setCount(targetImages.length)
	}, [orderIngredients]);

	return (
		<Link
			key={orderNumber}
			to={{
				pathname: `${location.pathname}/${orderNumber}`,
				state: { background: location },
			}}
			className={style.link}
		>
			<div className={style.order}>
				<div className={style.header}>
					<p className="text text_type_digits-default">{'#' + order.number}</p>
					<p className="text text_type_main-default text_color_inactive">{formatDate(order.createdAt)}</p>
				</div>

				<p className={style.name + ' text text_type_main-medium pb-6 pt-6'}>
					{order.name}<br />
					{showStatus && <span className="text text_type_main-default" style={{ color: (order.status === 'done') ? '#00CCCC' : '#FFFFFF' }}>{getStatus(order.status)}</span>}
				</p>

				<div className={style.footer}>
					<div className={style.images}>
						{
							images.map((image, i) => {
								let left = -i * 15;
								if (i <= showCount - 1)
									return <div key={i} className={style.imageWrapper} style={{ left: left, zIndex: 100 - i }}>
										<img className={style.image} src={image} alt="" />
									</div>
								if (i === showCount)
									return <div key={i} className={style.imageWrapper} style={{ left: left, zIndex: 100 - i }}>
										<p className={style.count + ' text text_type_digits-default'}>{'+' + (count - showCount + 1)}</p>
										<img className={style.image} style={{ opacity: 0.5 }} src={image} alt="" />
									</div>
								return false
							})
						}
					</div>

					<div className={style.coast}>
						<span className='text text_type_digits-default pr-2'>{price}</span>
						<CurrencyIcon type="primary" />
					</div>
				</div>
			</div>
		</Link>
	)
}
