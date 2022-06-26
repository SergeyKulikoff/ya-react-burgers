//Components
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

//Type
import PropTypes, { string } from 'prop-types';

//Style
import style from './ingredient-details.module.css'

export default function IngredientDetails(props) {

	return (
		<div className={`${style.item} pl-25 pr-25 pt-4`}>
			<div className={style.image}>
				<img src='' alt="Здесь должно быть изображение булки" />
			</div>

			<div className={style.about}>
				Биокотлета из марсианской Магнолии
			</div>

			<div className={`${style.nutriVal} mt-4`}>
				<div className={style.itemval}>
					<span className={style.val}>Калории,ккал</span>
					<p className={style.quantity}>244,4</p>
				</div>

				<div className={style.itemval}>
					<span className={style.val}>Белки, г</span>
					<p className={style.quantity}>12,2</p>
				</div>

				<div className={style.itemval}>
					<span className={style.val}>Жиры, г</span>
					<p className={style.quantity}>17,2</p>
				</div>

				<div className={style.itemval}>
					<span className={style.val}>Углеводы, г</span>
					<p className={style.quantity}>10,2</p>
				</div>
			</div>
		</div>
	)
}

// IngredientDetails.propTypes = {
// 	image: PropTypes.string.isRequired,
// 	price: PropTypes.number.isRequired,
// 	name: PropTypes.string.isRequired,
// }