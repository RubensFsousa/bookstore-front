import axios from 'axios';

export const http = axios.create({
    baseURL: 'https://api-spring-bookstore.herokuapp.com/api/'
});
