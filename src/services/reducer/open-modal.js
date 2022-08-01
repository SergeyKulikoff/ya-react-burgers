import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isActive: false
}

const modalSlice = createSlice({
	name: 'show',
	initialState,
	reducers: {
		openModal: state => {
			state.isActive = true;
		},
		closeModal: state => {
			state.isActive = false;
		}
	},
})

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;