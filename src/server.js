import { SteaphKafka, SteaphHTTP } from './services/steaph_api'
import { GetStateList } from './helpers/environment_state'
import { green, cyan, bold, yellow, blue, underline } from 'colors'
import KNoTCloud from 'knot-cloud'

//=================
//   Steaph API
//=================
var api;
if(process.argv.indexOf("--kafka") != -1) {
    api = new SteaphKafka("http://127.0.0.1:9092")
    console.log(green('➜  ') + blue('SteaphAPI:') + " Connection established through " + underline("Kafka"))
}
else {
    api = new SteaphHTTP("127.0.0.1", "8080", "ahdskfjwoikfadsf03i4ohrje0989uh3owefaihojn32whiaeojdsfjaosdkf")
    console.log(green('➜  ') + blue('SteaphAPI:') + " Connection established through " + underline("HTTP"))
}
//=================


//=================
//    KNoTCloud
//=================
const cloud = new KNoTCloud(
    'knot-test.cesar.org.br',
    3000,
    '357fcb33-9b6d-4122-b9e7-88f75fb30000',
    '63d37cc8a3048638e7aaed7a6a27187fb9d2b3df',
);
//=================

var handlerCondition = true
async function Handler(delay) {
    var devicesStatus = []

    // Get devices list
    try {
        devicesStatus = GetStateList(await api.getEnvironments(), await api.getSchedules())
    } catch(err) {console.log(err)}

    // Send to the devices their status
    for(var m of devicesStatus) {
        console.log(green('➜  ') + yellow('<' + m.id + '> ') + m.status)
        await cloud.setData(m.id, [{ sensorId: 1, value: m.status }])
    }

    // Create a loop
    if(handlerCondition) setTimeout(() => {Handler(delay)}, delay)
    else {api.close(); await cloud.close()}
}

async function main() {
    await cloud.connect()
    console.log(green('➜  ') + bold(cyan('SERVER:')) + " Service is running!!")

    Handler(30000)
}
main()
