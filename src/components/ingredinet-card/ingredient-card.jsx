//Components
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";

//Types
import PropTypes from 'prop-types';

//Style
import style from './ingredient-card.module.css';

export default function IngredientCard({ id, image, name, price, OnIngredientClick }) {
    return (
        <div className={style.item} onClick={() => OnIngredientClick(id)}>
            <Counter count={1} size="default" />
            <div className={style.image}>
                <img src={image} alt="Здесь должно быть изображение" />
            </div>

            <div className={style.price}>
                {price} <CurrencyIcon type="primary" />
            </div>

            <p className={style.about}>
                {name}
            </p>
        </div>
    )
}

IngredientCard.propTypes = {
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    OnIngredientClick: PropTypes.func.isRequired
}