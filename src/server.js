import { DbConfig } from './app/configs/database'

let argv = process.argv.slice(2)

DbConfig(
    argv.indexOf("--docker") >= 0
    ? "mongodb://mongo/steaph"
    : "mongodb://localhost:27017/steaph")

console.log(new Date())

function loop() {
    console.log("Hey there!");
    setTimeout(() => {loop()}, 3000);
}

loop();