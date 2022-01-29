import axios from 'axios';
const baseUrl = process.env.NODE_ENV === 'development' ? 'https://localhost:5443' : 'http://localhost:3001/api/';

const getCompanies = (appliances) => {
    return axios.get(`${baseUrl}/companies?app=${appliances}`);
}

const Api={
    getCompanies
}

export default Api;