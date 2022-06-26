//Style
import style from './order-details.module.css';

//Image
import done from '../../images/done.png';

export default function OrderDetails() {
	return (
		<>
			<div className={`${style.item} pl-25 pr-25 pb-15 pt-4`}>
				<div className={style.about}>
					<h1>034536</h1>
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
		</>
	);
}
