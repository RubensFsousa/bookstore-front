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

    updateRent: (data, id) => {
        return http.put(`Rent/${id}`, data);
    },

    deleteRent: (id) => {
        return http.delete(`Rent/${id}`);
    }
};
