var utils = require('ethereumjs-util')
var publicKey = utils.privateToPublic(process.argv[2]).toString('hex')
console.log(publicKey)