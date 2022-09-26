import { http } from '@/service/config';

export default {
    getAllPublishers: () => {
        return http.get('Publisher');
    },

    getOnePublisher: (id) => {
        return http.get(`Publisher/${id}`);
    },

    createPublisher: (data) => {
        return http.post('Publisher', data);
    },

    updatePublisher: (data, id) => {
        return http.put(`Publisher/${id}`, data);
    },

    deletePublisher: (id) => {
        return http.delete(`Publisher/${id}`);
    }
};
