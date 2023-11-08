import axios from 'axios'

const blogFetch = axios.create({
    baseURL: 'http://172.20.10.7:8080',
    headers: {
        "Content-Type": "application/json",
    }
})

export default blogFetch