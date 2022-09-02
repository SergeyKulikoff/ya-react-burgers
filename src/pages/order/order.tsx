
import { Order } from '../../components/order/order';
import style from './order.module.css';

export function OrderPage() {
	return (
		<div className={style.orderPage}>
			<Order />
		</div>
	)
}
