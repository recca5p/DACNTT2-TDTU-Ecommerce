import { request } from "../utils/axios";  

const getOrderAPI = (params) => request('get', `order${params}`);
const postOrderAPI = (data) => request('post', 'order', null, data);
const putOrderAPI = (id, data) => request('put', `order/${id}`, null, data);
const deleteOrderAPI = (id) => request('delete', `order/${id}`, null);

export {
	getOrderAPI,
	postOrderAPI,
	putOrderAPI,
	deleteOrderAPI
}