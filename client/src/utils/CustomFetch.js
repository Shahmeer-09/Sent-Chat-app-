import axios from 'axios'

const CustomFetch = axios.create({
    baseURL: `https://sent-chat-idkbqd1jp-shahmeers-projects-90ee6c2b.vercel.app/s1`
}) 

export default CustomFetch