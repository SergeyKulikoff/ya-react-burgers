//Components
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";

//Types
import PropTypes from 'prop-types';

//React hooks
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";

//Style
import style from './ingredient-card.module.css';

export default function IngredientCard({ id, image, name, type, price, OnIngredientClick }) {
    const { counts, bun } = useSelector((state) => state.fetchData.burgerIngredients);
    let count = (counts && counts[id] !== 'undefined') ? counts[id] : 0;
    count = (type === 'bun' && count && bun && id === bun.id) ? 2 : (type === 'bun' ? 0 : count);

    const [{ isDragging }, dragRef] = useDrag({
        type: "card",
        item: { id, name, image, price, type },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div className={style.item} onClick={() => OnIngredientClick(id)} ref={dragRef}>
            {count > 0 && <Counter count={count} size="default" />}
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