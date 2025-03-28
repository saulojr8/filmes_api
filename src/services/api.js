
import axios from "axios";

//BASE DA URL https://api.themoviedb.org/3/
// URL DA API: /movie/now_playing?api_key=7092f2e6ee4bbd1fe899d1c41dda5b5f&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api;