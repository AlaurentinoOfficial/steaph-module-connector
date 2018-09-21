import { CheckSchedule, IndexOfByID } from './schedule'

/**
 * GetListDevices
 * Combine the environments with their schedules to verify the environmnet state
 * 
 * @param environments Environments list
 * @param schedules Schdedule list
 * @returns List of status 
 */
exports.GetStateList = (environments, schedules) => {
    var statusList = []

    environments.forEach(env => {
        var status = false

        // Check the actual status
        schedules.forEach(sch => {
            if(sch.environment == env._id)
                if(CheckSchedule(sch))
                    status = true
        })

        let exists = IndexOfByID(statusList, env.device_id)
        
        // Add in list to be updated
        if(exists == -1)
            statusList.push({id: env.device_id, status: status})
        
        // If already exists, just change the value if is false
        else if(!statusList[exists].status)
                statusList[exists].status = status
    })

    return statusList
}