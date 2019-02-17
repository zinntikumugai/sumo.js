const SUMO = new (require("../src/index"))

let encodeinput = "こんにちは"
let encode = SUMO.encode(encodeinput)
let edecode = SUMO.decode(encode)
let decodeinput = "53302d71383361376236627a613377"
let decode = SUMO.decode(decodeinput)
let dencode = SUMO.encode(decode.substring(2, decode.length))

console.log("Encode")
console.log("input: " + encodeinput)
console.log("encode : " + encode)
console.log("decode : " + edecode)
console.log("check: " + (encodeinput == edecode.substring(2, edecode.length) ? "true": "false"))
console.log()
console.log("Decode")
console.log("input: " + decodeinput)
console.log("decode : " + decode)
console.log("encode : " + dencode)
console.log("check: " + (decodeinput == dencode ? "true": "false"))