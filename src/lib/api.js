import axios from "axios";
import {getToken} from "../utils/tokens";

const api=axios.create({
    baseURL:'http://localhost:3000/api'
})

const authApi=axios.create({
    baseURL:'http://localhost:3000/api',
    headers:{
        Authorization:`Bearer ${getToken()}`
    }
})




export{api,authApi}