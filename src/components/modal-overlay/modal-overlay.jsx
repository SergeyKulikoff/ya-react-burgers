//Style
import style from './modal-overlay.module.css'

export default function ModalOverlay({ close }) {
	return (
		<>
			<div className={style.overlay} onClick={close}></div>
		</>

	)
}
