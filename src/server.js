import { DbConfig } from './app/configs/database'
import { EnvironmentSchema } from './app/models/environment'
import { EnvironmentScheduleSchema } from './app/models/environment_schedule'
import { green, cyan, red, bold } from 'colors'
import KNoTCloud from 'knot-cloud'

DbConfig("mongodb://localhost:27017/steaph")

console.log(new Date())

const cloud = new KNoTCloud(
    '127.0.0.1',
    3000,
    '99c7a764-b9a3-11e8-96f8-529269fb1459',
    'kasjfklasdfj8ieaokdslafjdksla',
);

var devicesStatus = []

var loopCondition = true;
async function Loop() {
    try {
        // Query in database
        var environments = await EnvironmentSchema.find({}).exec()
        var schedules = await EnvironmentScheduleSchema.find({}).exec()

        // Reset the status
        devicesStatus = []

        environments.forEach(env => {
            var status = false
            var now = new Date()

            // Check the actual status
            schedules.forEach(sch => {
                if(sch.environment == env._id)
                    if(now >= sch.start && now < sch.end)
                        status = true
            })

            // Add in list
            devicesStatus.push({id: env.device_id, status: status})
        })
    }
    catch(err) {
        console.log(err)
    }

    // Send to the devices
    for(var m in devicesStatus) {
        console.log(green('➜  ') + cyan(m.id + ': ') + m.status)
        await cloud.setData(m.id, [{ sensorId: 1, value: m.status }]);
    }

    // Create a loop
    if(loopCondition)
        setTimeout(() => {Loop()}, 10000)
}

async function main() {
    await cloud.connect();

    await Loop()

    await cloud.close();
}
main();