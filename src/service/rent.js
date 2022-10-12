import { http } from '@/service/config';

export default {
    getAllRents: () => {
        return http.get('rent');
    },

    getOneRent: (id) => {
        return http.get(`rent/${id}`);
    },

    createRent: (data) => {
        return http.post('rent', data);
    },

    updateRent: (id, data) => {
        return http.put(`rent/${id}`, data);
    },

    devolution: (id) => {
        return http.put(`rent/Devolution/${id}`);
    },

    deleteRent: (id) => {
        return http.delete(`rent/${id}`);
    }
};
