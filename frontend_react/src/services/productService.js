import axios from 'axios'

const api_url = "http://localhost:8080/api/products";

export const listProducts =  () => axios.get(api_url);
export const addProduct = (product) => axios.post(api_url , product);
export const getProduct = (productID) =>axios.get(api_url + "/" +productID)
export const updateProduct = (productID , product) => axios.put(api_url + "/" +productID , product)
export const deleteProduct = (productID) => axios.delete(api_url + "/" + productID)
