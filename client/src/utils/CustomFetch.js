import axios from 'axios'

const CustomFetch = axios.create({
    baseURL: `https://sent-rose.vercel.app/s1`
}) 

export default CustomFetch

// https://sent-rose.vercel.app