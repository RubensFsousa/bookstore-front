import { http } from "@/service/config"

export default {

    getAllPublishers:() => {
        return http.get('Publisher')
    }

}