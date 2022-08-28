//Components
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

//React hooks
import { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { TIngredient } from '../../types';

//Style
import style from './list-item.module.css';

interface IListProps {
    item: TIngredient,
    isLocked: boolean,
    deleteFunc: () => void,
    moveFunc: (dragIndex: number, hoverIndex: number) => void,
    index: number,
}

interface DragItem {
    index: number
    id: string
    type: string
}

export const ListItem: FC<IListProps> = ({ item, index, isLocked, deleteFunc, moveFunc }) => {
    const id = item._id
    const ref = useRef<HTMLLIElement>(null)

    const [, drop] = useDrop<DragItem>({
        accept: 'item',

        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item: { index: number }, monitor) {
            if (!ref.current) return;
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) return;
            const hoverRect = ref.current?.getBoundingClientRect();
            const hoverMidY = (hoverRect.bottom - hoverRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            if (clientOffset != null) {
                const hoverClientY = clientOffset.y - hoverRect.top;
                if (dragIndex < hoverIndex && hoverClientY < hoverMidY) return;
                if (dragIndex > hoverIndex && hoverClientY > hoverMidY) return;
            }


            moveFunc(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{ isDrag }, drag] = useDrag({

        type: 'item',
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDrag: monitor.isDragging(),
        }),
    });
    const opacity = isDrag ? 0 : 1;
    drag(drop(ref))

    return (
        <li ref={ref} className={style.burger_item} style={{ opacity }}>
            <DragIcon type='primary' />
            <ConstructorElement
                text={item.name}
                price={item.price}
                isLocked={isLocked}
                thumbnail={item.image}
                handleClose={deleteFunc}
            />
        </li>
    )
}

export default ListItem