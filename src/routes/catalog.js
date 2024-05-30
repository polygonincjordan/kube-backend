const express = require("express");
const router = express.Router();
const axios = require("axios");
const request = require('request');
const config = require('../../config/env.config');
const logger = require('../../utils/logger');
const baseURL = `${config.apiEndpoint}:${config.apiEndpointPort}${config.apiSAPCatlogEndpoint}${config.apiCatalogEndpoint}`;

const auth = {
    username: "rakshitd",
    password: "idha@123",
};

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log("Catalog Middleware -> Time: ", Date.now());
    next();
});

// Get all Catalog of Vitals
router.get("/getAll", (req, res) => {
    const urlEndpoint = `${baseURL}?sap-statistics=true&sap-client=${config.client}&$format=json`;

    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'spnego': 'disabled',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
            res.json({ message: err });
            logger.log('error',error.message)
            return console.dir(error);
        }
        else {
            //res.header('Access-Control-Allow-Origin', 'http://abdaliwebserver.ach.jo:8090');
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
                logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:catalog.js`);
            }
            if (response.statusCode == 401) {

                return res.status(response.statusCode).json(body);
            }
            else {
                return res.status(response.statusCode).json(JSON.parse(body));
            }
        }
    });


});

// Modify one Catalog of Vital
router.put("/update/:catKey/:catItemKey", async (req, res) => {


    const { catKey, catItemKey } = req.params;
    const urlEndpoint = `${baseURL}(CatKey='${catKey}',CatItemKey='${catItemKey}')?sap-statistics=true&sap-client=${config.client}`;

    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    request({
        method: 'PUT',
        uri: urlEndpoint,
        body: req.body,
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'sap-client': config.client,
            'Cookie': mySAPSSO2Cookie,
        }
    }, function (error, response, body) {
        //console.log(response);
        if (error) {
            res.json(error);
            logger.log('error',error.message)
            return console.dir(error);
        }
        else {
            //console.log(body);
            if(response.statusCode != 200){
                logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:catalog.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
});

module.exports = router;
