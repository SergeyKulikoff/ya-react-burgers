import ReactDOM from 'react-dom';

//React hooks
import { FC, ReactNode, useEffect } from 'react';

//Components
import ModalOverlay from "../modal-overlay/modal-overlay";

//Types
import PropTypes from 'prop-types';

//Style
import style from './modal.module.css';

const modalRoot = document.getElementById("react-modals");

interface IModalProps {
	onClose: any,
	title?: string
	children: ReactNode
}

const Modal: FC<IModalProps> = ({ onClose, children, title }) => {
	useEffect(() => {
		const pressCloseModal = (e: KeyboardEvent) => e.key === 'Escape' && onClose();

		document.addEventListener('keydown', pressCloseModal);
		return () => {
			document.removeEventListener('keydown', pressCloseModal);
		}
	}, [onClose]);

	return ReactDOM.createPortal(
		<>
			<div className={`${style.modal} p-10 pb-15`}>
				<div className={style.headline}>
					<p>{title}</p>
					<span className={style.close} onClick={onClose}></span>
				</div>

				{children}
			</div>
			<ModalOverlay close={onClose} />
		</>,
		modalRoot as HTMLElement
	);
}

export default Modal