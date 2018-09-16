import { DbConfig } from './app/configs/database'
import { ConfigureAPI, GetEnvironments, GetSchedules } from './helpers/http_request'
import { GetListDevices } from './helpers/device_status'
import { green, cyan, bold, yellow } from 'colors'
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

var loopCondition = true;
async function Loop(delay) {
    var devicesStatus = []

    try {
        // Query in database
        var environments = await GetEnvironments()
        var schedules = await GetSchedules()

        devicesStatus = GetListDevices(environments, schedules)
    }
    catch(err) {
        console.log(err)
    }

    // Send to the devices
    for(var m of devicesStatus) {
        console.log(green('➜  ') + yellow('<' + m.id + '> ') + m.status)
        //await cloud.setData(m.id, [{ sensorId: 1, value: m.status }]);
    }

    // Create a loop
    if(loopCondition)
        setTimeout(() => {Loop(delay)}, delay)
}

async function main() {
    console.log(green('➜  ') + bold(cyan('SERVER:')) + " Service is running!!")
    //await cloud.connect();

    await Loop(30000)

    //await cloud.close();
}
main();