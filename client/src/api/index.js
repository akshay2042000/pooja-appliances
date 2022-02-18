import axios from 'axios';
const baseUrl = process.env.NODE_ENV === 'development' ? 'https://localhost:5443' : 'http://localhost:3001/api/';


axios.interceptors.request.use((req) => {
    const userState = JSON.parse(localStorage.getItem('persist:root'))?.userState;

    if (userState && JSON.parse(userState).currentUser) {
        const token = JSON.parse(userState).currentUser.accessToken
        req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
});

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
const getSearchedItem = (appliances, key) => {
    return axios.get(`${baseUrl}/products/search?app=${appliances}&key=${key}`);
}
const getRelatedProducts = (appliances, company, categories) => {
    var str = "";
    categories.map(cat => {
        str += `&categories=${cat._id}`;
    })
    return axios.get(`${baseUrl}/products/related?app=${appliances}&company=${company}${str}`);
}
const login = (username, password) => {
    return axios.post(`${baseUrl}/auth/login`, { username, password });
}

const placeOrder = (order) => {
    return axios.post(`${baseUrl}/orders`, order);
}

const getUserList = () => {
    return axios.get(`${baseUrl}/users`);
}
const getOrderList = () => {
    return axios.get(`${baseUrl}/orders`);
}

const deleteUser = (id) => {
    return axios.delete(`${baseUrl}/users/${id}`);
}
const deleteOrder = (id) => {
    return axios.delete(`${baseUrl}/orders/${id}`);
}



const Api = {
    getCompanies,
    getCategories,
    getProducts,
    getSingleProduct,
    getRelatedProducts,
    getSearchedItem,
    login,
    getUserList,
    placeOrder,
    deleteUser,
    deleteOrder,
    getOrderList
}

export default Api;