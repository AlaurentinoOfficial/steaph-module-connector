exports.CheckSchedule = CheckSchedule
exports.BaseDate = BaseDate

exports.IndexOfByID = (list, id) => {
    for(var i = 0; i < list.length; i++) {
        if(id == list[i].id)
            return i
    }

    return -1
}

/**
 * CheckSchedule
 * Check the schedule is on or off according of the time and the day
 * 
 * @param schedules Schedules list
 * @returns Bool 
 */
var CheckSchedule = (schedule) => {
    let now = new Date()
    return now >= BaseDate(new Date(schedule.start)) && now < BaseDate(new Date(schedule.end)) && now.getUTCDay() == schedule.day
}

/**
 * BaseDate
 * Remove the YYYY-MM-DD refence of the Date, remaining the time with actual date
 * 
 * @param date Date
 * @returns Date 
 */
var BaseDate = (date) => {
    let now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(),date.getMilliseconds())
}