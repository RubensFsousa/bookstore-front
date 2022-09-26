import { http } from "@/service/config"

export default {

    getAllBooks:() => {
        return http.get('BookStore')
    },

    createBook:(book) => {
        return http.post('BookStore')
    }
}