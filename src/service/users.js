import { http } from "@/service/config"

export default {

    getAllUsers:() => {
        return http.get('Users')
    }

}