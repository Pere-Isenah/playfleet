import axios from "axios"
const key = import.meta.env.VITE_API_KEY

const creatAxios = axios.create({baseURL:"https://api.rawg.io/api"})