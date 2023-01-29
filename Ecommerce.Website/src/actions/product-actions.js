import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getProductAPI } from "api";
import { getHistoryAPI, postHistoryAPI } from "api/history-api";

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

export const getProductStatistics = createAsyncThunk(
	'GET product statistics',
	async (id) => {
		try {
			const result = await getHistoryAPI(`?productId=${id}`);
			if(result.data) {
				return result.data;
			}
		} catch(error) {
			console.log(error);
		} 
	}
)

export const postHistory = createAsyncThunk(
	'POST history',
	async (data) => {
		try {
			await postHistoryAPI(data);
		} catch(error) {
			console.log(error);
		}
	}
)