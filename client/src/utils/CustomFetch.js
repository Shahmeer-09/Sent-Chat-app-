import axios from 'axios'

const CustomFetch = axios.create({
    baseURL: `https://sent-rose.vercel.app/authpage/s1`
}) 

export default CustomFetch