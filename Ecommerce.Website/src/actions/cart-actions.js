import { createAsyncThunk } from "@reduxjs/toolkit";

export const addToCart = createAsyncThunk(
	'Add To Cart',
	async (data) => {
		return data
	}
);

export const removeFromCart = createAsyncThunk(
	'Remove From Cart',
	async (id) => {
		return id
	}
);