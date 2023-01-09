import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInAPI, signUpAPI } from "api/auth-api";

export const signInAccount = createAsyncThunk(
	'POST Sign In',
	async (data) => {
		try {
			const result = await signInAPI(data);
			return result.data;
		} catch(error) {
			throw error;
		}
	}
);

export const signUpAccount = createAsyncThunk(
	'POST Sign Up',
	async (data) => {
		try {
			const result = await signUpAPI(data);
			return result.data;
		} catch(error) {
			throw error;
		}
	}
);
