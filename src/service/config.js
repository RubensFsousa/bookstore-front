import axios from 'axios';

export const http = axios.create({
    baseURL: 'https://lib-api-spring.loca.lt/'
});
