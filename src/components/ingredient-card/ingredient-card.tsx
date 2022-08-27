//Components
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";

//Types
import PropTypes from 'prop-types';
import { FC } from "react";

//React hooks
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";
import { TIngredient } from "../../types";

//Style
import style from './ingredient-card.module.css';

export interface IProductListProps {
    id: string | any,
    image: string,
    name: string,
    type: string,
    price: number
}

const IngredientCard: FC<IProductListProps> = ({ id, image, name, type, price }) => {
    const { counts, bun } = useAppSelector(state => state.fetchData.burgerIngredients);
    let count = (counts && id !== 'undefined') ? counts[id] : 0;
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
            to={{
                pathname: `/ingredients/${id}`,
                state: { background: location }
            }
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

export default IngredientCard;
