import { createSlice } from "@reduxjs/toolkit";
import * as Actions from "actions";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: JSON.parse(localStorage.getItem("cart")) ?? [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(Actions.addToCart.fulfilled, (state, action) => {
		const data = action.payload;
		let currentCart = state.data;
		const index = currentCart.findIndex(item => item.id === data.id);

		if(index > -1) {
			currentCart[index].quantity += 1;
		} else {
			currentCart.push({
				...data,
				quantity: 1
			})
		}

		localStorage.setItem('cart', JSON.stringify(currentCart));
		state.data = currentCart;
	});
	builder.addCase(Actions.removeFromCart.fulfilled, (state, action) => {
		const id = action.payload;
		const newCart = state.data?.filter(item => item.id !== id);

		localStorage.setItem('cart', JSON.stringify(newCart));
		state.data = newCart;
	});
  },
});

const { reducer } = cartSlice;
export default reducer;