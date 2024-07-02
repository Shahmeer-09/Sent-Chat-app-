import axios from 'axios'

const CustomFetch = axios.create({
    baseURL: `${window.location.href}/s1`
}) 

export default CustomFetch