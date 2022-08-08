//Components
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";

//Types
import PropTypes from 'prop-types';

//React hooks
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

//Style
import style from './ingredient-card.module.css';

export default function IngredientCard({ id, image, name, type, price}) {
    const { counts, bun } = useSelector((state) => state.fetchData.burgerIngredients);
    let count = (counts && counts[id] !== 'undefined') ? counts[id] : 0;
    count = (type === 'bun' && count && bun && id === bun.id) ? 2 : (type === 'bun' ? 0 : count);
    const location = useLocation()

    const [{ isDragging }, dragRef] = useDrag({
        type: "card",
        item: { id, name, image, price, type },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <Link className={style.item}
              ref={dragRef}
              to={{pathname:`/ingredients/${id}`,
              state:{background:location}}
         }>
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
        </Link>
    )
}

IngredientCard.propTypes = {
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
}