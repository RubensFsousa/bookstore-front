import { http } from '@/service/config';

export default {
    getAllBooks: () => {
        return http.get('bookstore');
    },

    getOneBook: (id) => {
        return http.get(`bookstore/${id}`);
    },

    createBook: (data) => {
        return http.post('bookstore', data);
    },

    updateBook: (id, data) => {
        return http.put(`bookstore/${id}`, data);
    },

    deleteBook: (id) => {
        return http.delete(`bookstore/${id}`);
    }
};
