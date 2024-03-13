import axios from 'axios'
//import { IP } from "@env"

const blogFetch = axios.create({
    baseURL: `http://10.171.1.68:8080`,
    headers: {
        "Content-Type": "application/json",
    }
})

export default blogFetch