//React hools
import { useEffect, useState } from 'react';

//Custom hooks
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';

//Components
import { FeedItem } from '../../components/feed-item/feed-item';

//Style
import style from './feed.module.css';

//Config
import { feedsUrl } from "../../config";

//Types
import { TOrder } from '../../types';

//Actions
import { wsConectionClose, wsConectionStart } from "../../services/actions";

export function FeedPage() {
	const dispatch = useAppDispatch();
	const [total, setTotal] = useState(0);
	const [totalToday, setTotalToday] = useState(0);
	const [orders, setOrders] = useState<TOrder[]>([]);
	const { messages } = useAppSelector(state => state.wsReducer);
	const [createdNumbers, setCreatedNumbers] = useState<TOrder[][]>([]);
	const [doneNumbers, setDoneNumbers] = useState<TOrder[][]>([]);

	useEffect(() => {
		dispatch(wsConectionStart(feedsUrl));
		return () => {
			dispatch(wsConectionClose)
		}
	}, [dispatch]);

	useEffect(() => {
		if (messages?.orders) {
			setOrders(messages.orders);
			setTotal(messages.total);
			setTotalToday(messages.totalToday)
		}
	}, [messages]);

	const splitArray = (arr: any, size: number) => arr.reduce((item: any, c: any) => {
		if (item[item.length - 1].length === size) { item.push([]); }
		item[item.length - 1].push(c);
		return item;
	}, [[]]);

	useEffect(() => {
		if (orders.length) {
			const created = orders.filter(item => item.status === 'created');
			const done = orders.filter(item => item.status === 'done');
			setCreatedNumbers(splitArray(created, 10));
			setDoneNumbers(splitArray(done, 10))
		}
	}, [orders]);

	return (
		<main>
			<p className="text text_type_main-large pt-4 pb-6">
				Лента заказов
			</p>

			<div className={style.content}>
				<div className={style.feed_container}>
					{Boolean(orders.length) && orders.map(item => item?.ingredients?.length ? <FeedItem key={item['_id']} order={item} showStatus={false} /> : false)}
				</div>

				<div className={style.info + ' pl-8'}>
					<div className={style.wrapper}>
						<div className={style.status}>
							<p className="text text_type_main-medium pb-6">Готовы:</p>
							<div className={style.statusColumn}>
								{
									doneNumbers.length && doneNumbers[0].length
										? doneNumbers.map((doneNumbersColumn, i) =>
											<div key={i} className={style.statusNumber}>
												{doneNumbersColumn.map(item => <span key={item.number} className={style.done + ' text text_type_digits-default'}>{item.number}</span>)}
											</div>)
										: <p className="text text_type_main-medium text_color_inactive">нет</p>
								}
							</div>
						</div>

						<div className={style.inwork}>
							<p className="text text_type_main-medium pb-6">В работе:</p>
							<div className={style.statusColumn}>
								{
									createdNumbers.length && createdNumbers[0].length
										? createdNumbers.map((createdNumbersColumn, i) =>
											<div key={i} className={style.statusColumn}>
												{createdNumbersColumn.map(item => <span key={item.number} className="text text_type_digits-default">{item.number}</span>)}
											</div>)
										: <p className="text text_type_main-medium text_color_inactive">нет</p>
								}
							</div>
						</div>
					</div>

					<div className={style.completed}>
						<p className="text text_type_main-medium mt-10">Выполнено за все время:</p>
						<p className="text text_type_digits-large">{total}</p>

						<p className="text text_type_main-medium mt-10">Выполнено за сегодня:</p>
						<p className="text text_type_digits-large">{totalToday}</p>
					</div>
				</div>
			</div>
		</main>
	)
}