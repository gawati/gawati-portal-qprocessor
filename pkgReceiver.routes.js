const pr = require("./pkgReceiver");

/**
 * API stack for each Request end point. 
 * They are called one after the other in the order of the array
 */
var prAPIs  = {};

/*
Receives package to be published 
Input object submitted to the API:
"data": {
    "checksum": "",
    "pkg": "tmpxxxxx.zip"
}
 */
prAPIs["/publish/pkg"] = {
    method: "post",
    stack: [
        pr.receiveFilesSubmitData,
        pr.verifyChecksum,
        pr.publishOnPkgQ,
        pr.returnResponse
    ]
};

module.exports.prAPIs = prAPIs;