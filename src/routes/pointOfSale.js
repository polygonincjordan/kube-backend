const request = require('request');
const express = require("express");
const router = express.Router();
const axios = require("axios");
const config = require('../../config/env.config');
const logger = require('../../utils/logger');
const baseURL = `${config.apiEndpoint}:${config.apiEndpointPort}${config.apiSAPCatlogEndpoint}${config.apiZNPOINTSALESRV}`;
router.use((req, res, next) => {
    console.log("Patient Data Middleware Time: ", Date.now());
    next();
});
//pos
router.post("/getPatientInfoByCase/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const urlEndpoint = String.raw`${baseURL}/PatInfoSet(Falnr='${req.body.CaseNumber}')`;
    const options = {
        method: 'GET',
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
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
                logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:pointOfSale.js`);
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
router.get("/getStorageLocations/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const urlEndpoint = String.raw`${baseURL}/StorageLocF4Set?$format=json`;
    const options = {
        method: 'GET',
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
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
                logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:pointOfSale.js`);
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
router.post("/getMaterialDetailsSet/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const urlEndpoint = String.raw`${baseURL}/MaterialDetailsSet?$filter=${req.body.fieldName} eq '${req.body.fieldValue}' and Lgort eq '${req.body.Lgort}'`;
    console.log(urlEndpoint);
    const options = {
        method: 'GET',
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
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
                logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:pointOfSale.js`);
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
module.exports = router;
