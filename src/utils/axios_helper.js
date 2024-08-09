import axios from 'axios';

const raxios = axios.create({
    // baseURL: 'http://localhost:8000'
    baseURL: 'https://test.sukoonunlimited.com'
});

export default raxios;