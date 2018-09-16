import { DbConfig } from './app/configs/database'
import { ConfigureAPI, GetEnvironments, GetSchedules } from './app/helpers/http_request'
import { green, cyan, red, bold } from 'colors'
import KNoTCloud from 'knot-cloud'

ConfigureAPI({
    host: "127.0.0.1",
    port: "8080",
    token: "ahdskfjwoikfadsf03i4ohrje0989uh3owefaihojn32whiaeojdsfjaosdkf"
})

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
        var environments = await GetEnvironments()
        var schedules = await GetSchedules()

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
    console.log(green('➜  ') + bold(cyan('SERVER:')) + " Service is running!!")
    //await cloud.connect();

    await Loop()

    //await cloud.close();
}
main();