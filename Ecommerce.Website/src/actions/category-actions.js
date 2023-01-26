import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCategoryAPI } from "api";

export const getAllCategories = createAsyncThunk(
	'GET categories',
	async () => {
		try {
			const result = await getCategoryAPI();

			const parentCate = result.data?.filter(item => !item.parent);
			const childCate = result.data?.filter(item => item.parent);
			const newData = parentCate.map(item => {
				return {
					...item,
					child: childCate.filter(c => c.parent === item.id)
				}
			});

			return newData;
		} catch(error) {
			console.log(error);
		}
	}
)