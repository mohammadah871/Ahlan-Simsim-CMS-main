import axios from 'axios';
import {apiBaseUrl} from './config'


axios.defaults.baseURL = apiBaseUrl;

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common.Accept = 'application/json';



const token =  localStorage.getItem('jwt_access_token')

if (token) {
    axios.defaults.headers.common['Authorization'] = token;
}



export default axios;