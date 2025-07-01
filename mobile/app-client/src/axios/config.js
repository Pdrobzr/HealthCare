import axios from 'axios'
//import { IP } from "@env"

const blogFetch = axios.create({
    baseURL: `http://192.168.51.203:8080`,
    headers: {
        "Content-Type": "application/json",
    }
})

export default blogFetch