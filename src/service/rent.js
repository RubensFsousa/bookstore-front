import { http } from "@/service/config"

export default {

    getAllRents:() => {
        return http.get('Rent')
    }

}