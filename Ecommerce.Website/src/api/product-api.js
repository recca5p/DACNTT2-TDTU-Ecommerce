import { request } from "../utils/axios";  

const getProductAPI = (params) => request('get', `product${params}`);
const postProductAPI = (data) => request('post', 'product', null, data);
const putProductAPI = (id, data) => request('put', `product/${id}`, null, data);
const deleteProductAPI = (id) => request('delete', `product/${id}`, null);

export {
	getProductAPI,
	postProductAPI,
	putProductAPI,
	deleteProductAPI
}