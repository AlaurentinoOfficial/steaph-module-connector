import { DbConfig } from './app/configs/database'

let argv = process.argv.slice(2)

DbConfig(
    argv.indexOf("--docker") >= 0
    ? "mongodb://mongo/steaph"
    : "mongodb://localhost:27017/steaph")

console.log(new Date())

var loop = (delay) => {
    console.log("Hey there!");
    setTimeout(() => {loop(delay)}, delay);
}; loop(3000)