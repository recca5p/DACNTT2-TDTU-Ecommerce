import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getProductAPI } from "api";

export const getProductsList = createAsyncThunk(
	'GET products',
	async (query) => {
		try {
			const result = await getProductAPI(query);
			return result.data;
		} catch(error) {
			console.log(error);
		}
	}
)

export const getSingleProduct = createAsyncThunk(
	'GET product',
	async (slug) => {
		try {
			const result = await getProductAPI(`/${slug}`);
			return result.data;
		} catch(error) {
			console.log(error);
		}
	}
)

export const clearProductState = createAction("Clear product state");