const axios = require("axios");
const mq = require("./queues");
const md5 = require('md5');

/**
 * Receives the submitted data. This particular API expects multipart form data.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const receiveFilesSubmitData = (req, res, next) => {
    // convert the formdata multipart object to use the json object form expected in formObject.
    console.log(" IN: receiveFilesSubmitData");
    res.locals.formObject = req.body;
    res.locals.formFiles = req.files;
    next();
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const returnResponse = (req, res) => {
    console.log(" IN: returnResponse");    
    res.json(res.locals.returnResponse);
};

/**
 * Verify the checksum of the zip file
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const verifyChecksum = (req, res, next) => {
    console.log(" IN: verifyChecksum");
    const {checksum} = res.locals.formObject;
    const zipFile = res.locals.formFiles[0];

    if(checksum === md5(zipFile.buffer)) {
        console.log(` Checksum of ${zipFile.originalname} verified`);
        next();
    } else {
        res.locals.returnResponse = {
            'error': {
                'code': 'publish_pkg',
                'message': 'Checksum does not match.'
            }
        }
        res.json(res.locals.returnResponse);
    }
};

/**
 * Publishes the status for document iri on the STATUS_Q
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const publishOnPkgQ = (req, res, next) => {
    console.log(" IN: publishOnPkgQ");
    //Publish on ZIP_Q

    //Respond to editor-qprocessor with status {"iri": "", "status", "under_processing"}

    // const msg = {
    //     "iri": iri,
    //     "status": status
    // }

    // const mq = require("./queues");
    // const qName = 'ZIP_Q';
    // const ex = mq.getExchange();
    // const key = mq.getQKey(qName);
    // mq.getChannel(qName).publish(ex, key, new Buffer(JSON.stringify(msg)));
    // console.log(" Status dispatched to Editor-FE");

    res.locals.returnResponse = {
        'success': {
            'code': 'publish_pkg',
            'message': 'Package submitted to Portal for processing.'
        }
    }
    next();
};

/**
 * API methods for each Request end point.
 * You need to call next() at the end to ensure the next api in the chain
 * gets called.
 * Calling res.json(res.locals.returnResponse) will return the response 
 * without proceeding to the next method in the API stack. 
 */
module.exports = {
    receiveFilesSubmitData: receiveFilesSubmitData,
    verifyChecksum: verifyChecksum,
    publishOnPkgQ: publishOnPkgQ,
    returnResponse: returnResponse
};