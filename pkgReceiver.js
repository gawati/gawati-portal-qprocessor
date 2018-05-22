const axios = require("axios");
const mq = require("./queues");

/**
 * Receives the Form posting, not suitable for multipart form data
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const receiveSubmitData = (req, res, next) =>  {
    console.log(" IN: receiveSubmitData");
    const formObject = req.body.data ; 
    res.locals.formObject = formObject; 
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
 * Publishes the status for document iri on the STATUS_Q
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const publishOnPkgQ = (req, res, next) => {
    console.log(" IN: publishOnPkgQ");
    console.log(res.locals.formObject);
    const {checksum, zip} = res.locals.formObject;

    //Verify checksum

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

    // res.locals.returnResponse = {
    //     'success': {
    //         'code': 'publish_status',
    //         'message': res.locals.formObject
    //     }
    // }
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
    receiveSubmitData: receiveSubmitData,
    publishOnPkgQ: publishOnPkgQ,
    returnResponse: returnResponse
};