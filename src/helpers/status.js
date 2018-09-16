exports.CheckSchedule = CheckSchedule
exports.BaseDate = BaseDate

exports.IndexOfByID = (list, id) => {
    for(var i = 0; i < list.length; i++) {
        if(id == list[i].id)
            return i
    }

    return -1
}

var CheckSchedule = (schedule) => {
    let now = new Date()
    return now >= BaseDate(new Date(schedule.start)) && now < BaseDate(new Date(schedule.end)) && now.getUTCDay() == schedule.day
}

var BaseDate = (date) => {
    let now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(),date.getMilliseconds())
}