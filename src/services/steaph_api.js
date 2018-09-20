import axios from 'axios'
import { KafkaClient, Consumer } from 'kafka-node'
import { green, blue, bold } from 'colors'

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
    constructor(host, port, token) {
        this.host = host
        this.port = port
        this.token = token
    }

    async getEnvironments() {
        try {
            const res = await axios(`http://${this.host}${this.port ? ":" + this.port : ""}/local/environment`)
            return res.data
        } 
        catch(err) {
            console.log("Connection to API error!")
            return []
        }
    }

    async getSchedules() {
        try {
            const res = await axios(`http://${this.host}${this.port ? ":" + this.port : ""}/local/schedule`)
            return res.data
        } 
        catch(err) {
            console.log("Connection to API error!")
            return []
        }
    }

    close() {}
}