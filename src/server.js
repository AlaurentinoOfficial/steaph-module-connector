import { SteaphAPI } from './helpers/http_request'
import { GetListDevices } from './helpers/device_status'
import { green, cyan, bold, yellow } from 'colors'
import KNoTCloud from 'knot-cloud'

const api = new SteaphAPI(
    "127.0.0.1",
    "8080",
    "ahdskfjwoikfadsf03i4ohrje0989uh3owefaihojn32whiaeojdsfjaosdkf"
)

const cloud = new KNoTCloud(
    'knot-test.cesar.org.br',
    3000,
    '78159106-41ca-4022-95e8-2511695ce64c',
    'd5265dbc4576a88f8654a8fc2c4d46a6d7b85574',
);

var loopCondition = true;
async function Loop(delay) {
    var devicesStatus = []

    try {
        // Query in Steaph API
        var environments = await api.getEnvironments()
        var schedules = await api.getSchedules()

        devicesStatus = GetListDevices(environments, schedules)
    }
    catch(err) {
        console.log(err)
    }

    // Send to the devices
    for(var m of devicesStatus) {
        console.log(green('➜  ') + yellow('<' + m.id + '> ') + m.status)
        await cloud.setData(m.id, [{ sensorId: 1, value: m.status }]);
    }

    // Create a loop
    if(loopCondition)
        setTimeout(() => {Loop(delay)}, delay)
}

async function main() {
    await cloud.connect();
    console.log(green('➜  ') + bold(cyan('SERVER:')) + " Service is running!!")

    await Loop(30000)

    await cloud.close();
}
main();
