const pako = require('pako')
const punycode = require('punycode')

module.exports = class {
    constructor() {
        this.version = 1
        this.header = "S"
        this.noCompression = "0"
        this.withGzipCompression = "1"
    }

    encode(str) {
        let unCompressed = this.noCompress(str)
        let commpress = this.commpressGzip(str)
        if (unCompressed.length < commpress.length)
            return unCompressed
        else
            return commpress
    }

    decode(binry) {
        let output = ""
        try {
            output = this.formHexToText(binry)
        } catch (e) {
            try {
                output = this.fromGzipHexToText(binry)
            } catch (e) {
                console.log("Could not decode SUMO", e)
            }
        }
        return output
    }

    noCompress(str) {
        let d = [this.header, this.noCompression, str].reduce((x, y) => {
            return x.concat(y)
        }, "")
        let p = punycode.encode(d)
        return this.toHex(new Uint8Array(new Buffer.from(p)))
    }

    commpressGzip(str) {
        let d = [this.header, this.withGzipCompression, str].reduce((x, y) => {
            return x.concat(y)
        }, "")
        return this.toHex(pako.gzip(punycode.encode(d)))
    }

    ___toHex(array) {
        return array.map(byte => {
            return ("0" + (byte & 0xFF).toString(16)).slice(-2)
        })
    }

    _toHex(array) {
        return Array.prototype.map.call(array, function (byte) {
            return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        })
    }

    toHex(array) {
        return Array.from(array).map(byte => {
            return ("0" + (byte & 0xFF).toString(16)).slice(-2)
        }).join("")
    }

    fromHex(hexStr) {
        let result = []
        while (hexStr.length >= 2) {
            result.push(parseInt(hexStr.substring(0, 2), 16))
            hexStr = hexStr.substring(2, hexStr.length)
        }
        return new Uint8Array(result)
    }

    removeNonAscii(str) {
        return str.replace(/[^\x00-\x7F]/g, "")
    }

    uint8ArrayToString(unit8) {
        return (new Buffer.from(unit8)).toString()
    }

    formHexToText(binry) {
        let h = String(this.removeNonAscii(this.uint8ArrayToString(this.fromHex(binry))))
        return punycode.decode(h)
    }

    fromGzipHexToText(binry) {
        return punycode.decode(this.uint8ArrayToString(pako.inflate(this.fromHex(binry))))
    }
}