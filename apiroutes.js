const express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
const packageJSON = require("./package.json");
const prapis = require ("./pkgReceiver.routes");

var upload = multer();

var router = express.Router();

var jsonParser = bodyParser.json();

const EXCLUDE_FROM_AUTO_ROUTE = ["/publish/pkg"];

// handle /publish/pkg here because it is special as it has zip file
var cpUpload = upload.fields(); //[{ name: 'file_0', maxCount: 1 }]
router.post("/publish/pkg",
    upload.any(),
    prapis.prAPIs["/publish/pkg"].stack
);

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
            if (EXCLUDE_FROM_AUTO_ROUTE.indexOf(routePath) < 0) {
                router.post(
                    routePath,
                    jsonParser,
                    prRoute.stack
                );
            }
            break;
        default:
            logr.error(`Unknown method provide ${prRoute.method} only "get" and "post" are supported` );
            break;
        }
    }
);

module.exports = router;

