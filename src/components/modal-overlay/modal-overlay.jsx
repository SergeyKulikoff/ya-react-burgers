//Types
import PropTypes from 'prop-types';

//Style
import style from './modal-overlay.module.css'

export default function ModalOverlay({ close }) {
	return (
		<>
			<div className={style.overlay} onClick={close}></div>
		</>

	)
}

ModalOverlay.propTypes = {
	close: PropTypes.func.isRequired,
}
