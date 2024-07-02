import axios from 'axios'

const CustomFetch = axios.create({
    baseURL: `https://sent-xi.vercel.app/s1`
}) 

export default CustomFetch