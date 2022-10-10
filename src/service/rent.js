import { http } from '@/service/config';

export default {
    getAllRents: () => {
        return http.get('Rent');
    },

    getOneRent: (id) => {
        return http.get(`Rent/${id}`);
    },

    createRent: (data) => {
        return http.post('Rent', data);
    },

    updateRent: (id, data) => {
        return http.put(`Rent/${id}`, data);
    },

    devolution: (id) => {
        return http.put(`Rent/Devolution/${id}`);
    },

    deleteRent: (id) => {
        return http.delete(`Rent/${id}`);
    }
};
