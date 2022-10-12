import { http } from '@/service/config';

export default {
    getAllPublishers: () => {
        return http.get('publisher');
    },

    getOnePublisher: (id) => {
        return http.get(`publisher/${id}`);
    },

    createPublisher: (data) => {
        return http.post('publisher', data);
    },

    updatePublisher: (id, data) => {
        return http.put(`publisher/${id}`, data);
    },

    deletePublisher: (id) => {
        return http.delete(`publisher/${id}`);
    }
};
