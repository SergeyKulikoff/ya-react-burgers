import { useEffect, useState } from 'react'
import { FeedItem } from '../feed-item/feed-item'
import style from './orders.module.css'
import { getCookie } from "../../utils/cookie";
import { TOrder } from '../../types'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { feedsUserUrl } from '../../config';
import { wsConectionClose, wsConectionStart } from '../../services/actions';

export function Orders() {
	const dispatch = useAppDispatch();
	const { messages } = useAppSelector(state => state.wsReducer);

	const [orders, setOrders] = useState<TOrder[]>([]);
	let accessToken = getCookie('token'), token = '';
	if (accessToken) token = accessToken.split(' ')[0];

	useEffect(() => {
		dispatch(wsConectionStart(feedsUserUrl + accessToken));
		return () => {
			dispatch(wsConectionClose())
		}
	}, [dispatch, accessToken]);

	useEffect(() => {
		if (messages?.orders) {
			setOrders(messages.orders);
		}
	}, [messages]);

	return (
		<div className={style.feed}>
			{
				Boolean(orders.length)
					? orders.map(item => item?.ingredients?.length ? <FeedItem key={item['_id']} order={item} showStatus={true} /> : false)
					: <p className="text text_type_main-default text_color_inactive pt-4">У Вас еще не было заказов</p>
			}
		</div>
	)
}