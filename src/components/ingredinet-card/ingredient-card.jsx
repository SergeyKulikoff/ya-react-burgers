//Components
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

//Types
import PropTypes from 'prop-types';

//Style
import style from './ingredient-card.module.css';

export default function IngredientCard(props) {

    return (
        <div className={style.item} onClick={() => props.click()}>
            <div className={style.image}>
                <img src={props.image} alt="Здесь должно быть изображение булки" />
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

IngredientCard.propTypes = {
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
}