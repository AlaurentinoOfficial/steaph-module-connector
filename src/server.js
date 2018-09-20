import { SteaphKafka, SteaphHTTP } from './services/steaph_api'
import { GetListDevices } from './helpers/device_status'
import { green, cyan, bold, yellow } from 'colors'
import KNoTCloud from 'knot-cloud'

//const api = new SteaphKafka("http://127.0.0.1:9022")
const api = new SteaphHTTP(
    "127.0.0.1",
    8080,
    "ahdskfjwoikfadsf03i4ohrje0989uh3owefaihojn32whiaeojdsfjaosdkf"
)

const cloud = new KNoTCloud(
    'knot-test.cesar.org.br',
    3000,
    '78159106-41ca-4022-95e8-2511695ce64c',
    'd5265dbc4576a88f8654a8fc2c4d46a6d7b85574',
);

var handlerCondition = true;
async function Handler(delay) {
    var devicesStatus = []

    // Get devices list
    try {
        devicesStatus = GetListDevices(api.getEnvironments(), api.getSchedules())
    } catch(err) {console.log(err)}

    // Send to the devices their status
    for(var m of devicesStatus) {
        console.log(green('➜  ') + yellow('<' + m.id + '> ') + m.status)
        //await cloud.setData(m.id, [{ sensorId: 1, value: m.status }]);
    }

    // Create a loop
    if(handlerCondition) setTimeout(() => {Handler(delay)}, delay)
}

async function main() {
    //await cloud.connect();
    console.log(green('➜  ') + bold(cyan('SERVER:')) + " Service is running!!")

    await Handler(30000)

    api.close()
    //await cloud.close();
}
main();
