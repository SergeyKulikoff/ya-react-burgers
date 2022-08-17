//Types
import PropTypes from 'prop-types';
import { FC } from 'react';

//Style
import style from './modal-overlay.module.css'

type IModalOverlayProps = {
	close: () => void
}

export const ModalOverlay: FC<IModalOverlayProps> = ({ close }) => {
	return (
		<div className={style.overlay} onClick={close}></div>
	)
}

export default ModalOverlay
