import axios from 'axios'
import { KafkaClient, Consumer } from 'kafka-node'
import { green, blue, bold, red } from 'colors'

export class SteaphKafka {
    constructor(host) {
        this.environments = []
        this.schedules = []

        this.client = new KafkaClient({kafkaHost: `${this.host}`})
        this.environmentConsumer = new Consumer(this.client, [{topic: "steaph.environments", partition: 0}], {autoCommit: false})
        this.scheduleConsumer = new Consumer(this.client, [{topic: "steaph.schedules", partition: 0}], {autoCommit: false})
    
        this.environmentConsumer.on('message', (msg) => {
            this.environments = msg
        })

        this.scheduleConsumer.on('message', (msg) => {
            this.schedules = msg
        })
    }

    getEnvironments() {
        return this.environments
    }

    getSchedules() {
        return this.schedules
    }

    close() {
        this.environmentConsumer.close(null)
        this.scheduleConsumer.close(null)
        this.client.close(null)
    }
}

export class SteaphHTTP {
    constructor(connection, token) {
        this.connection = connection

        axios.defaults.headers.common['Authorization'] = `${token}`;
    }

    async getEnvironments() {
        const url = `${this.connection}/local/environment`
        try {
            const res = await axios(url)
            return res.data
        } 
        catch(err) {
            console.log(url + red(" Connection error!"))
            return []
        }
    }

    async getSchedules() {
        const url = `http://${this.connection}/local/schedule`
        try {
            const res = await axios(url)
            return res.data
        } 
        catch(err) {
            console.log(url + red(" Connection error!"))
            return []
        }
    }

    close() {}
}