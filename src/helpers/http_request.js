import axios from 'axios'
import { green, blue, bold } from 'colors'

export class SteaphAPI {
    constructor(host, port, token) {
        this.host = host
        this.port = port
        this.token = token
    }

    getEnvironments() {
        return []
    }

    getSchedules() {
        return []
    }
}

var config = {}

exports.ConfigureAPI = (c) => {
    config = c

    if(config.token)
        axios.defaults.headers.common['Authorization'] = c.token;
    
    console.log(green('➜  ') + bold(blue('API:')) + " Succefully to configure the API!")
}

exports.GetEnvironments = async() => {
    try {
        const res = await axios(`http://${config.host}${config.port ? ":" + config.port : ""}/local/environment`)
        return res.data
    } 
    catch(err) {
        console.log("Connection to API error!")
        return []
    }
}

exports.GetSchedules = async() => {
    try {
        const res = await axios(`http://${config.host}${config.port ? ":" + config.port : ""}/local/schedule`)
        return res.data
    } 
    catch(err) {
        console.log("Connection to API error!")
        return []
    }
}