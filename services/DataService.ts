import { $axios } from '@/utils/api'
class DataService {
    getData(){
        return $axios.$get('/task/data.json')
    }
    getNames(){
        return $axios.$get('/task/names.json')
    }
}
export default new DataService();






