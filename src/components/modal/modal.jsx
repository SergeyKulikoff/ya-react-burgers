import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

//Components
import ModalOverlay from "../modal-overlay/modal-overlay";

//Types
import PropTypes, { string } from 'prop-types';

//Style
import style from './modal.module.css'

const modalRoot = document.getElementById("react-modals");
export default function Modal({ isOpen, children, title }) {
	const [closeModal, setOpen] = useState(isOpen);
	useEffect(() => {
		document.addEventListener('keydown', pressCloseModal);
		document.addEventListener('click', pressCloseModal);

		return () => {
			document.removeEventListener('keydown', pressCloseModal);
			document.addEventListener('click', pressCloseModal);
		}
	}, [])

	let pressCloseModal = (e) => {
		const modal = document.querySelector('.modal-overlay_overlay__FmKub')
		if (e.key === 'Escape' || e.target === modal) {
			setOpen(!closeModal);
		}
	}

	let handleCloseModal = (e) => {
		e.preventDefault()
		setOpen(!closeModal);

		if (!e.target) {
			setOpen(!closeModal);
		}
	}

	return ReactDOM.createPortal(
		<>
			{closeModal ?
				<>
					<div className={`${style.modal} p-10 pb-15`}>
						<div className={style.headline}>
							<p>{title}</p>
							<span className={style.close} onClick={handleCloseModal}></span>
						</div>

						{children}
					</div>
					<ModalOverlay />
				</> : null
			}
		</>,
		modalRoot
	);
}

// Modal.propTypes = {
// 	isOpen: PropTypes.bolean.isRequired,
// 	title: PropTypes.string.isRequired,
// 	children: PropTypes.object.isRequired,
// }