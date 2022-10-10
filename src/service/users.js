import { http } from '@/service/config';

export default {
    getAllUsers: () => {
        return http.get('Users');
    },

    getOneUser: (id) => {
        return http.get(`Users/${id}`);
    },

    createUser: (data) => {
        return http.post('Users', data);
    },

    updateUser: (id, data) => {
        return http.put(`Users/${id}`, data);
    },

    deleteUser: (id) => {
        return http.delete(`Users/${id}`);
    }
};
