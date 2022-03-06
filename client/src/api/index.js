import axios from 'axios';
const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://pooja-appliances.herokuapp.com';


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
    console.log(order)
    return axios.post(`${baseUrl}/orders`, order);
}

const getUserList = () => {
    return axios.get(`${baseUrl}/users`);
}
const getOrderList = (form) => {
    if (form.appliance === "all") {
        return axios.get(`${baseUrl}/orders`);
    }
    return axios.get(`${baseUrl}/orders?app=${form.appliance}`);
}

const deleteUser = (id) => {
    return axios.delete(`${baseUrl}/users/${id}`);
}
const deleteOrder = (id) => {
    return axios.delete(`${baseUrl}/orders/${id}`);
}

const getSingleOrder = (id) => {
    return axios.get(`${baseUrl}/orders/${id}`);
}
const getSearchedUsers = (key) => {
    return axios.get(`${baseUrl}/users/search?key=${key}`);
}
const submitBill = (bill) => {
    return axios.post(`${baseUrl}/bills`, bill);
}
const postInvoice = (name, invoiceData) => {
    return axios.post(`${baseUrl}/invoicePdf`, { name: name, invoiceData: invoiceData });
}

const getBillList = (form) => {
    if (form.appliance === "all") {
        return axios.get(`${baseUrl}/bills`);
    }
    return axios.get(`${baseUrl}/bills?app=${form.appliance}`);
}

const deleteBill = (id, name, order) => {
    return axios.delete(`${baseUrl}/bills/${id}`, {
        data: {
            name: name,
            order: order
        }
    });
}

const getSingleBill = (id) => {
    return axios.get(`${baseUrl}/bills/${id}`);
}

const updateOrder = (id, order) => {
    return axios.put(`${baseUrl}/orders/${id}`, order);
}

const getLastBill = (appliance) => {
    return axios.get(`${baseUrl}/bills/last?app=${appliance}`);
}

const getLatestOrders = () => {
    return axios.get(`${baseUrl}/orders/latest`);
}

const getLatestBills = () => {
    return axios.get(`${baseUrl}/bills/latest`);
}

const getFeaturedProducts = (appliance) => {
    return axios.get(`${baseUrl}/products/featured?app=${appliance}`);
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
    getOrderList,
    getSingleOrder,
    getSearchedUsers,
    submitBill,
    postInvoice,
    getBillList,
    deleteBill,
    getSingleBill,
    updateOrder,
    getLastBill,
    getLatestOrders,
    getLatestBills,
    getFeaturedProducts
}

export default Api;