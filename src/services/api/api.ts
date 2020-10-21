import axios from 'axios'
import config from './config'


const customInstance = axios.create({
    baseURL: config.site.api,
    headers: {
        'Accept': 'application/json',
    }
})

export default customInstance
