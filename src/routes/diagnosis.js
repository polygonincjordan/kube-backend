const request = require('request');
const express = require("express");
const router = express.Router();
const axios = require("axios");
const config = require('../../config/env.config');
const logger = require('../../utils/logger');
const baseURL = `${config.apiEndpoint}:${config.apiEndpointPort}${config.apiSAPCatlogEndpoint}${config.apiZGENERICSRV}`;

router.use((req, res, next) => {
    console.log("Diagnosis Data Middleware Time: ", Date.now());
    next();
});

router.get("/DIAMASTERSET/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { searchString } = req.query;

    if (searchString && searchString.length > 3) {

        const urlEndpoint = String.raw`${baseURL}/DIAMASTERSET?$filter=substringof(%27${searchString}%27,text)`;
        
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
                res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
                res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
                res.header('Access-Control-Expose-Headers', 'Content-Length');
                res.header('Access-Control-Allow-Credentials', 'true');
                res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
                if(response.statusCode != 200){
                    logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:diagnosis.js`);
                }
                if (response.statusCode == 401) {

                    return res.status(response.statusCode).json(body);
                }
                else {
                    return res.status(response.statusCode).json(JSON.parse(body));
                }
            }
        });
    }
});


router.get("/DIAFAVSET/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { einri,orgId } = req.query;

    const urlEndpoint = String.raw`${baseURL}/DIAFAVSET?$filter=einri eq '${einri}' and orgId eq '${orgId}' &$format=json`;

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
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
                logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:diagnosis.js`);
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


router.get("/DIAGNOSISSET/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { einri,falnr,movmntSeq } = req.query;

    const urlEndpoint = String.raw`${config.apiEndpoint}:${config.apiEndpointPort}${config.apiSAPCatlogEndpoint}${config.apiZNISHPATCASEDATA}/DIAGNOSISSET?$filter=einri eq '${einri}' and falnr eq '${falnr}' and movmntSeq eq '${movmntSeq}'&$format=json`;

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
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
                logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:diagnosis.js`);
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
