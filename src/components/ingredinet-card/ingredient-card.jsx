
//Components
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

//Style
import style from './ingredient-card.module.css';

const IngredientCard = (props) => {

    return (
        <div className={style.item}>
            <div className={style.image}>
                <img src={props.image} alt="" />
            </div>

            <div className={style.price}>
                {props.price} <CurrencyIcon type="primary" />
            </div>

            <p className={style.about}>
                {props.name}
            </p>
        </div>
    )
}
export default IngredientCard;