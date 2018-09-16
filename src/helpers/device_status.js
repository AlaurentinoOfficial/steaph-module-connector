import { CheckSchedule, IndexOfByID } from './status'

var GetListDevices = (environments, schedules) => {
    var devicesStatus = []

    environments.forEach(env => {
        var status = false

        // Check the actual status
        schedules.forEach(sch => {
            if(sch.environment == env._id)
                if(CheckSchedule(sch))
                    status = true
        })

        let exists = IndexOfByID(devicesStatus, env.device_id)
        
        // Add in list to be updated
        if(exists == -1)
            devicesStatus.push({id: env.device_id, status: status})
        
        // If already exists, just change the value if is false
        else if(!devicesStatus[exists].status)
                devicesStatus[exists].status = status
    })

    return devicesStatus
}

exports.GetListDevices = GetListDevices