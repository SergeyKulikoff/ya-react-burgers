//Components
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

//React hooks
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

//Style
import style from './list-item.module.css'

export default function ListItem({ item, index, isLocked, deleteFunc, moveFunc }) {
    const id = item._id;
    const ref = useRef(null);

    const [{ handlerId }, drop] = useDrop({
        accept: 'item',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) return;
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) return;

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();

            if (clientOffset != null) {
                const hoverClientY = clientOffset.y - hoverBoundingRect.top;
                if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
                if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
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