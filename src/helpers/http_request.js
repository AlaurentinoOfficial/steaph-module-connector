import axios from 'axios'
import { green, blue, bold } from 'colors'

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