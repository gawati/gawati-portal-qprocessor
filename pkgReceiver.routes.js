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
        pr.storeZip,
        pr.publishOnZipQ,
        pr.returnResponse
    ]
};

/*
Receives IRI to be retracted 
Input object submitted to the API:
"data": {
    "iri": "/akn/ke/act/legge/1970-06-03/Cap_44/eng@/!main"
}
 */
prAPIs["/retract/pkg"] = {
    method: "post",
    stack: [
        pr.receiveSubmitData,
        pr.publishOnIriQ,
        pr.returnResponse
    ]
};

module.exports.prAPIs = prAPIs;