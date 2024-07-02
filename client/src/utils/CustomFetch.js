import axios from 'axios'

const CustomFetch = axios.create({
    baseURL: `${window.location.origin}/s1`
}) 

export default CustomFetch