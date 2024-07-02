import axios from 'axios'

const CustomFetch = axios.create({
    baseURL: `https://sent-chat-app.vercel.app/s1`
}) 

export default CustomFetch