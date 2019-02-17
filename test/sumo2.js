const SUMO = new (require("../src/index"))

let encodeinput = "こんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちはこんにちは"
let encode = SUMO.encode(encodeinput)
let edecode = SUMO.decode(encode)
let decodeinput = "1f8b08000000000000030b36d42db4304e840193bc2428302f4c8602c38c142830b6c84e4d4c850000c2e5d1ad39000000"
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