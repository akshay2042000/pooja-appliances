import axios from 'axios';
const baseUrl = process.env.NODE_ENV === 'development' ? 'https://localhost:5443' : 'http://localhost:3001/api/';

const getCompanies = (appliances) => {
    return axios.get(`${baseUrl}/companies?app=${appliances}`);
}

const getCategories = (appliances) => {
    return axios.get(`${baseUrl}/categories?app=${appliances}`);
}

const getProducts = (appliances, cat, comp) => {
    return axios.get(`${baseUrl}/products?app=${appliances}&category=${cat}&company=${comp}`);
}

const getSingleProduct = (id) => {
    return axios.get(`${baseUrl}/products/${id}`);
}
const getRelatedProducts = (appliances, company, categories) => {
    var str = "";
    categories.map(cat => {
        str += `&categories=${cat._id}`;
    })
    return axios.get(`${baseUrl}/products/related?app=${appliances}&company=${company}${str}`);
}


const Api = {
    getCompanies,
    getCategories,
    getProducts,
    getSingleProduct,
    getRelatedProducts
}

export default Api;