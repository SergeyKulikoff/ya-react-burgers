// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

// export const initialState = {
// 	loading: false,
// 	hasError: false,
// 	data: [],
// 	error: null
// }

// const checkResponse = (res) => {
// 	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
// }

// export const getIngredients = createAsyncThunk(
// 	'post/fetch',
// 	async function () {
// 		await fetch(API_URL)
// 			.then(checkResponse)
// 			.then(data => {
// 				if (data?.success) return data.data;

// 				return Promise.reject(data)
// 			});
// 	}
// )

// export const fetchSlice = createSlice({
// 	name: 'ingredients',
// 	initialState,
// 	extraReducers: builder => {
// 		builder.addCase(getIngredients.pending, (state) => {
// 			state.loading = true;
// 			state.hasError = false;
// 		});
// 		builder.addCase(getIngredients.fulfilled, (state, action) => {
// 			state.data = action.payload;
// 			state.loading = false;
// 		});
// 		builder.addCase(getIngredients.rejected, (state, action) => {
// 			state.loading = false;

// 			if (action.payload) {
// 				state.hasError = true;
// 				state.error = action.payload;
// 			}
// 		})

// 	}
// })

// export default fetchSlice.reducer;