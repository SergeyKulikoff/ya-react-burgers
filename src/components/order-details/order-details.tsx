//Style
import style from './order-details.module.css';

//Image
import done from '../../images/done.png';

//React hooks
import { useAppSelector } from '../../hooks/hooks';

export default function OrderDetails() {
	const order = useAppSelector(state => state.orderReducer) || null;

	if (order && order.number) {
		return (
			<div className={`${style.item} pl-25 pr-25 pb-15 pt-4`}>
				<div className={style.about}>
					<h1 className='ordernumber'>{order.number}</h1>
					<p className={`${style.text} mt-8 mb-15`}>
						идентификатор заказа
					</p>
				</div>

				<div className={`${style.image} mb-15`}>
					<img src={done} alt="Галочка успешного заказа" />
				</div>

				<div className={`${style.waiting} mb-2`}>
					<p>Ваш заказ начали готовить</p>
					<span>Дождитесь готовности на орбитальной станции</span>
				</div>
			</div>
		)
	} else {
		return (
			<div className={style.order_details}>
				<span className={style.order_text + " mt-10 text text_type_main-small"}>
					<p>Подождите немного... Мы оформляем Ваш заказ !</p>
				</span>
			</div>
		)
	}
}
