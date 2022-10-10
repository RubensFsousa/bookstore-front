import { http } from '@/service/config';

export default {
    getAllBooks: () => {
        return http.get('BookStore');
    },

    getOneBook: (id) => {
        return http.get(`BookStore/${id}`);
    },

    createBook: (data) => {
        return http.post('BookStore', data);
    },

    updateBook: (id, data) => {
        return http.put(`BookStore/${id}`, data);
    },

    deleteBook: (id) => {
        return http.delete(`BookStore/${id}`);
    }
};
