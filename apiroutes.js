const express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
const packageJSON = require("./package.json");
const prapis = require ("./pkgReceiver.routes");

var upload = multer();

var router = express.Router();

var jsonParser = bodyParser.json();

/** adding Portal Pkg Receiver apis */
Object.keys(prapis.prAPIs).forEach(
    (routePath) => {
        const prRoute = prapis.prAPIs[routePath];
        console.log(` ROUTE PATH = ${routePath} with ${prRoute.method}`);
        switch(prRoute.method) {
        case "get":
            router.get(
                routePath,
                jsonParser,
                prRoute.stack
            );
            break;
        case "post":
            router.post(
                routePath,
                jsonParser,
                prRoute.stack
            );
            break;
        default:
            logr.error(`Unknown method provide ${prRoute.method} only "get" and "post" are supported` );
            break;
        }
    }
);

module.exports = router;

