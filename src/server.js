import { DbConfig } from './app/configs/database'
import KNoTCloud from 'knot-cloud'

let argv = process.argv.slice(2)

DbConfig(
    argv.indexOf("--docker") >= 0
    ? "mongodb://mongo/steaph"
    : "mongodb://localhost:27017/steaph")

console.log(new Date())

const cloud = new KNoTCloud(
    'knot-test.cesar.org.br',
    3000,
    '78159106-41ca-4022-95e8-2511695ce64c',
    'd5265dbc4576a88f8654a8fc2c4d46a6d7b85574',
);

async function main() {
    await cloud.connect();
    console.log(await cloud.getDevices());
    await cloud.close();
}
main();