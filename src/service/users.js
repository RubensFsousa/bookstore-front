import { http } from '@/service/config';

export default {
    getAllUsers: () => {
        return http.get('users');
    },

    getOneUser: (id) => {
        return http.get(`users/${id}`);
    },

    createUser: (data) => {
        return http.post('users', data);
    },

    updateUser: (id, data) => {
        return http.put(`users/${id}`, data);
    },

    deleteUser: (id) => {
        return http.delete(`users/${id}`);
    }
};
