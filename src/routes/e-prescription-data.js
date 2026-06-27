const request = require('request');
const express = require("express");
const router = express.Router();
const axios = require("axios");
const config = require('../../config/env.config');
const logger = require('../../utils/logger');
router.use((req, res, next) => {
    console.log("Patient Data Middleware Time: ", Date.now());
    next();
});
const baseURL = `${config.apiEndpoint}:${config.apiEndpointPort}${config.apiSAPCatlogEndpoint}`;
const baseDiagnosisURl = `${config.apiEndpoint}:${config.apiEndpointPort}${config.apiSAPCatlogEndpoint}${config.apiZABEMRDIAGNOSISSRV}`;
router.get("/DurationAdministrationUnitSet", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });


    const urlEndpoint = String.raw`${config.apiEndpointIntegrationAdministration}/DurationUnitSet`;

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
             logger.log('error',error.message);
            res.json({ message: error });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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

router.get("/LocalizationSet", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    request({
        method: 'GET',
        uri: baseURL + config.apiZABEMRORDSETSRV + "/LocalizationSet",
        body: req.body,
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'sap-client': config.client,
            'Cookie': mySAPSSO2Cookie,

            //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
        }
    }, function (error, response, body) {
        if (error) {
             logger.log('error',error.message);
            res.json(error);
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
});
router.get("/OrderSetSubtitleSet/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });
    console.log('url-----', baseURL + config.apiZABEMRORDSETSRV + `/OrderSetSubtitleSet?$filter=(Id eq '${req.query.Id}')`);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    request({
        method: 'GET',
        uri: baseURL + config.apiZABEMRORDSETSRV + `/OrderSetSubtitleSet?$filter=(Id eq ${req.query.Id})`,
        body: req.body,
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'sap-client': config.client,
            'Cookie': mySAPSSO2Cookie,

            //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
        }
    }, function (error, response, body) {
        if (error) {
             logger.log('error',error.message);
            res.json(error);
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
});
router.post("/getEventSetData/", async (req, res) => {
    const urlEndpoint = `${config.apiEndpointIntegrationAdministration}/GetEventsSet`;

    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    console.log(JSON.stringify(req.body));
    request({
        method: 'POST',
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
        console.log(response);
        console.log(JSON.stringify(body));
        if (error) {
             logger.log('error',error.message);
            res.json(error);
            return console.dir(error);
        }
        else {
            //console.log(body);
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
});

router.get("/medicationAdministrationUnitSet/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { Einri, Falnr, Lfdnr } = req.query;

    const urlEndpoint = String.raw`${config.apiEndpointIntegrationAdministration}/AdminDetailsSet(Einri='${Einri}',Falnr='${Falnr}',Lfdnr='${Lfdnr}')`;

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
             logger.log('error',error.message);
            res.json({ message: error.message });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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

router.get("/medicationDetails/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { Einri, Falnr, Searchtype, SearchString } = req.query;

    const urlEndpoint = String.raw`${config.apiEndpointIntegrationAdministration}/SearchMSet?$filter=Einri eq '${Einri}' and Falnr eq '${Falnr}' and Searchtype eq '${Searchtype}' and SearchString eq '${SearchString}'&$expand=TODURG,TOTEMPLATE&$format=json`;

    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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

router.get("/userTemplateMedication/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { EINRI, PRSCRID, Ordtype } = req.query;

    const urlEndpoint = String.raw`${config.apiEndpointIntegrationEPresc}/PrescriptionSet?$filter=EINRI eq '${EINRI}' and PRSCRID eq '${PRSCRID}'and Ordtype eq '${Ordtype}'&$expand=PrescriptionItemSet&$format=json`;

    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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

router.get("/orderTemplateMedication/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { EINRI, FALNR, PRSCRID, Ordtype } = req.query;

    const urlEndpoint = String.raw`${config.apiEndpointIntegrationAdministration}/PrescriptionSet?$filter=EINRI eq '${EINRI}' and FALNR eq '${FALNR}' and PRSCRID eq '${PRSCRID}'and Ordtype eq '${Ordtype}'&$expand=PrescriptionItemSet&$format=json`;

    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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


router.get("/frequencyCycle/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { N1znr } = req.query;

    const urlEndpoint = String.raw`${config.apiEndpointIntegrationAdministration}/CycleDefSet(N1znr='${N1znr}')?$format=json`;

    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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

router.get("/frequencyQ24Cycle/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { N1znr } = req.query;

    const urlEndpoint = String.raw`${config.apiEndpointIntegrationAdministration}/CycleDefSet?$filter=N1znr eq '${N1znr}'&$format=json`;

    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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

router.get("/CycleDefMasterSet/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { N1znr } = req.query;

    const urlEndpoint = String.raw`${config.apiEndpointIntegrationAdministration}/CycleDefMasterSet?$filter=N1znr eq '${N1znr}'&$format=json`;

    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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

router.get("/OrdCycleDefSet/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { Meordid } = req.query;

    const urlEndpoint = String.raw`${config.apiEndpointIntegrationAdministration}/OrdCycleDefSet?$filter=Meordid eq '${Meordid}'&$format=json`;

    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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

router.get("/TOCYCDEFSet/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { OrderId } = req.query;

    const urlEndpoint = String.raw`${config.apiEndpointIntegrationAdministration}/TOCYCDEFSet?$filter=OrderId eq '${OrderId}'&$format=json`;

    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: error.message });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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

router.get("/employeeresponsible/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });


    const urlEndpoint = String.raw`${config.apiEndpointIntegrationAdministration}/EmpResponsibleSet?$format=json`;

    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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

router.get("/templatesearchtype/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { Einri, Falnr, SearchString, Ordtype } = req.query;
    const urlEndpoint = String.raw`${config.apiEndpointIntegrationAdministration}/SearchMSet?$filter=Einri eq '${Einri}' and Falnr eq '${Falnr}' and Searchtype eq 'B' and SearchString eq '${SearchString}' and Ordtype eq '${Ordtype}'&$expand=TODURG,TOTEMPLATE&$format=json`;

    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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



router.get("/OrderingList/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });


    const urlEndpoint = String.raw`${config.apiEndpointIntegrationAdministration}/OrgUnitSet?$format=json`;

    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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
router.get("/routeDropdownlist/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const urlEndpoint = String.raw`${config.apiEndpointIntegrationAdministration}/RouteF4Set?$format=json`;

    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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

router.get("/DurgUnitlist/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { Einri, Falnr, Lfdnr, Drugid } = req.query;
    const urlEndpoint = String.raw`${config.apiEndpointIntegrationAdministration}/DurgUnitSet?$filter=Einri eq '${Einri}' and Falnr eq '${Falnr}' and Lfdnr eq '${Lfdnr}' and Drugid eq '${Drugid}'&$format=json`;

    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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


router.get("/OrderHistorylist/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { Einri, Falnr, Lfdnr, Drugid } = req.query;
    const urlEndpoint = String.raw`${config.apiEndpointIntegrationOrderdetails}/OrderHistorySet?$filter=Einri eq '${Einri}' and Falnr eq '${Falnr}'&$format=json`;

    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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

router.put("/updateMedicationStatus/", async (req, res) => {
    const { Meordid } = req.query;
    const urlEndpoint = config.apiEndpointIntegrationOrderdetails + `OrderActionSet(Meordid='${Meordid}')`;

    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    console.log(JSON.stringify(req.body));
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
             logger.log('error',error.message);
            res.json(error);
            return console.dir(error);
        }
        else {
            //console.log(body);
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
});



router.get("/CancelMedicationStatus/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { Einri } = req.query;
    const urlEndpoint = String.raw`${config.apiEndpointIntegrationOrderdetails}/CancellationReasonSet?$filter=Einri eq '${Einri}'&$format=json`;

    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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

router.get("/EndOrdReasonMedication/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { Einri } = req.query;
    const urlEndpoint = String.raw`${config.apiEndpointIntegrationOrderdetails}/EndOrdReasonSet?$filter=Einri eq '${Einri}'&$format=json`;

    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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

router.put("/EditMedicationStatus/", async (req, res) => {
    const { Meordid } = req.query;
    const urlEndpoint = `${config.apiEndpointIntegrationOrderdetails}/EditOrderSet(Meordid='${Meordid}')`;

    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    console.log(JSON.stringify(req.body));
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
             logger.log('error',error.message);
            res.json(error);
            return console.dir(error);
        }
        else {
            //console.log(body);
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
});

router.put("/CopyMedicationStatus/", async (req, res) => {
    const { Meordid } = req.query;
    const urlEndpoint = `${config.apiEndpointIntegrationOrderdetails}/CopyOrderSet(Meordid='${Meordid}')`;

    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    console.log(JSON.stringify(req.body));
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
             logger.log('error',error.message);
            res.json(error);
            return console.dir(error);
        }
        else {
            //console.log(body);
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
});

router.get("/OrderEventMedicationStatus/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { Einri, Falnr, Meordid } = req.query;
    const urlEndpoint = String.raw`${config.apiEndpointIntegrationOrderdetails}/OrderEventSet?$filter=Einri eq '${Einri}' and Falnr eq '${Falnr}' and Meordid eq '${Meordid}'&$format=json`;

    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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

router.put("/updateEventMedicationStatus/", async (req, res) => {
    const { Meordid } = req.query;
    const urlEndpoint = config.apiEndpointIntegrationOrderdetails + `EventActionSet(Meordid='${Meordid}')`;

    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    console.log(JSON.stringify(req.body));
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
             logger.log('error',error.message);
            res.json(error);
            return console.dir(error);
        }
        else {
            //console.log(body);
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
});

router.get("/SurgeryStatus/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { Einri, Fromdatetime, Todatetime, SurgResp } = req.query;
    const urlEndpoint = String.raw`${config.apiEndpointIntegrationsurgery}/SurgerySet?$filter=( Einri eq '${Einri}' and Fromdatetime eq datetime'${Fromdatetime}' and Todatetime eq datetime'${Todatetime}' and SurgResp eq '${SurgResp}' )`;

    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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



router.post("/VisitSet/", async (req, res) => {
    const urlEndpoint = `${config.apiEndpointIntegrationsurgery}/VisitSet`;

    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    console.log(JSON.stringify(req.body));
    request({
        method: 'POST',
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
        console.log(response);
        console.log(JSON.stringify(body));
        if (error) {
             logger.log('error',error.message);
            res.json(error);
            return console.dir(error);
        }
        else {
            //console.log(body);
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
});


router.post("/SaveConsultationVisitSet/", async (req, res) => {
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRCORDSRV}/VisitSet`;

    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    console.log(JSON.stringify(req.body));
    request({
        method: 'POST',
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
        console.log(response);
        console.log(JSON.stringify(body));
        if (error) {
             logger.log('error',error.message);
            res.json(error);
            return console.dir(error);
        }
        else {
            //console.log(body);
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
});


router.post("/SaveAdmissionSet/", async (req, res) => {
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRCORDSRV}/AdmissionSet`;

    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    console.log(JSON.stringify(req.body));
    request({
        method: 'POST',
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
        console.log(response);
        console.log(JSON.stringify(body));
        if (error) {
             logger.log('error',error.message);
            res.json(error);
            return console.dir(error);
        }
        else {
            //console.log(body);
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
});

router.post("/getAdministerEvent/", async (req, res) => {
    const urlEndpoint = `${config.apiEndpointIntegrationAdminister}/AdministerSet`;

    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    console.log(JSON.stringify(req.body));
    request({
        method: 'POST',
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
        console.log(response);
        console.log(JSON.stringify(body));
        if (error) {
             logger.log('error',error.message);
            res.json(error);
            return console.dir(error);
        }
        else {
            //console.log(body);
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
});

router.get("/DoseReason/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { Einri, Fromdatetime, Todatetime, SurgResp } = req.query;
    const urlEndpoint = String.raw`${config.apiEndpointIntegrationAdminister}/DoseReasonF4Set`;

    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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

router.get("/TimeReason/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { Einri, Fromdatetime, Todatetime, SurgResp } = req.query;
    const urlEndpoint = String.raw`${config.apiEndpointIntegrationAdminister}/TimeReasonF4Set?$format=json`;

    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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

router.post("/DrugReturnEvent/", async (req, res) => {
    const urlEndpoint = `${config.apiEndpointIntegrationAdminister}/DrugReturnSet`;

    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    console.log(JSON.stringify(req.body));
    request({
        method: 'POST',
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
        console.log(response);
        console.log(JSON.stringify(body));
        if (error) {
             logger.log('error',error.message);
            res.json(error);
            return console.dir(error);
        }
        else {
            //console.log(body);
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
});

router.get("/DrugReturnReason/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { Einri, Fromdatetime, Todatetime, SurgResp } = req.query;
    const urlEndpoint = String.raw`${config.apiEndpointIntegrationAdminister}/DrugReturnReasonSet?$format=json`;

    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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

router.get("/MaterialBatch/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { Einri, Falnr, Nursingou, Drugid } = req.query;
    const urlEndpoint = String.raw`${config.apiEndpointIntegrationAdminister}/MaterialBatchSet?$filter=Einri eq '${Einri}' and Falnr eq '${Falnr}' and Nursingou eq '${Nursingou}' and Drugid eq '${Drugid}'`;

    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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


router.post("/AdditionalSupply/", async (req, res) => {
    const urlEndpoint = `${config.apiEndpointIntegrationAdminister}/AdditionalSupplySet`;

    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    console.log(JSON.stringify(req.body));
    request({
        method: 'POST',
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
        console.log(response);
        console.log(JSON.stringify(body));
        if (error) {
             logger.log('error',error.message);
            res.json(error);
            return console.dir(error);
        }
        else {
            //console.log(body);
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
});

router.get("/RequestReason/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { Einri, Fromdatetime, Todatetime, SurgResp } = req.query;
    const urlEndpoint = String.raw`${config.apiEndpointIntegrationAdminister}/RequestReasonSet?$format=json`;

    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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


router.post("/OrderTemplate/", async (req, res) => {
    const urlEndpoint = `${config.apiEndpointIntegrationAdministration}/OrderTemplateSet`;

    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    console.log(JSON.stringify(req.body));
    request({
        method: 'POST',
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
        console.log(response);
        console.log(JSON.stringify(body));
        if (error) {
             logger.log('error',error.message);
            res.json(error);
            return console.dir(error);
        }
        else {
            //console.log(body);
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
});


router.get("/VitalChart/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { Einri, Patnr, Odatege, Odatele, Extid } = req.query;
    const urlEndpoint = String.raw`${config.apiEndpointIntegrationVital}/VitalChartSet?$filter=Einri eq '${Einri}' and Patnr eq '${Patnr}' and ( Odate ge datetime'${Odatege}' and Odate le datetime'${Odatele}' )&$expand=ToVitalChartItems`;

    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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

router.get("/OrderTemplateget", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { Einri, Falnr, Tpgid, Ordtype } = req.query;
    const urlEndpoint = String.raw`${config.apiEndpointIntegrationAdministration}/OrderTemplateSet?$filter=Einri eq '${Einri}' and Falnr eq '${Falnr}' and Tpgid eq '${Tpgid}' and Ordtype eq '${Ordtype}'&$expand=TOORDERTEMPLATE/TOCOMPLEX&$format=json`;

    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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


router.put("/updateFillSource/", async (req, res) => {
    const { Meevtid } = req.query;
    const urlEndpoint = `${config.apiEndpointIntegrationAdminister}/FillSourceSet(Meevtid='${Meevtid}')`;

    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    console.log(JSON.stringify(req.body));
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
             logger.log('error',error.message);
            res.json(error);
            return console.dir(error);
        }
        else {
            //console.log(body);
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
});

router.post("/updateFillSourcepost/", async (req, res) => {
    const urlEndpoint = `${config.apiEndpointIntegrationAdminister}/FillSourceSet`;
    console.log(urlEndpoint)

    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    request({
        method: 'POST',
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
        console.log(response);
        console.log(JSON.stringify(body));
        if (error) {
            logger.log('error',error.message);
            res.json(error);
            return console.dir(error);
        }
        else {
            if(response.statusCode != 200){
            logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
});

router.get("/EventChangeLogListSet/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });
    const { Meevtid } = req.query;
    const urlEndpoint = String.raw`${config.apiEndpointIntegrationOrderdetails}/EventChangeLogListSet?$filter=Meevtid eq '${Meevtid}'&$format=json`;
    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
            logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
            logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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

router.get("/FSourcelist/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { Meevtid } = req.query;
    const urlEndpoint = String.raw`${config.apiEndpointIntegrationAdminister}/FSourceF4Set?$filter=Meevtid eq '${Meevtid}'&$format=json`;
    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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

router.get("/EmarEventSet/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { Einri, Falnr } = req.query;
    const urlEndpoint = String.raw`${config.apiEndpointIntegrationEPrescriptionOrder}/EmarEventSet?$filter=Einri eq '${Einri}' and Falnr eq '${Falnr}'&$format=json`;
    console.log(urlEndpoint)
    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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

router.get("/RequestStat/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { Meevtid } = req.query;
    const urlEndpoint = String.raw`${config.apiEndpointIntegrationAdminister}/RequestStatSet?$format=json`;

    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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
router.get("/ProtoHeadersearchedCode/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { ProtoCode } = req.query;

    const urlEndpoint = String.raw`${config.apiEndpointIntegrationChemotherapy}/ProtoHeaderSet?$filter=ProtoCode eq '${ProtoCode}'`;

    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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

router.get("/ProtoHeadersearched/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { ProtoDesc } = req.query;

    const urlEndpoint = String.raw`${config.apiEndpointIntegrationChemotherapy}/ProtoHeaderSet?$filter=ProtoDesc eq '${ProtoDesc}'`;

    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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

router.get("/ChemoHistory/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { Patnr } = req.query;

    const urlEndpoint = String.raw`${config.apiEndpointIntegrationChemotherapy}/ChemoHistorySet?$filter=Patnr eq '${Patnr}'`;

    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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

router.post("/ChemoHistorypost/", async (req, res) => {
    const urlEndpoint = `${config.apiEndpointIntegrationChemotherapy}/ChemoHistorySet`;

    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    console.log(JSON.stringify(req.body));
    request({
        method: 'POST',
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
        console.log(response);
        console.log(JSON.stringify(body));
        if (error) {
             logger.log('error',error.message);
            res.json(error);
            return console.dir(error);
        }
        else {
            //console.log(body);
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
});

router.get("/RecentLabResults/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { Patnr } = req.query;

    const urlEndpoint = String.raw`${config.apiEndpointIntegrationChemotherapy}/RLabResultSet?$filter=Patnr eq '${Patnr}'`;

    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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

router.get("/ProtoDiagnosis/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { Dtext1 } = req.query;

    const urlEndpoint = String.raw`${config.apiEndpointIntegrationChemotherapy}/ProtoDiagnosisSet?$filter=Dtext1 eq '${Dtext1}'`;

    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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

router.get("/PatHeightWeight/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { Falnr, Lfdnr } = req.query;
    const urlEndpoint = String.raw`${config.apiEndpointIntegrationChemotherapy}/PatHgtWgtSet(Falnr='${Falnr}',Lfdnr='${Lfdnr}')`;


    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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

router.get("/PreviousCycle/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { Patnr ,PrevProtoId} = req.query;
    const urlEndpoint = String.raw`${config.apiEndpointIntegrationChemotherapy}/PreviousCycleSet?$filter=Patnr eq '${Patnr}' and PrevProtoId eq '${PrevProtoId}'&$format=json`;


    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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

// router.get("/ManualLogSet/", (req, res) => {
//     let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
//     let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
//     var j = request.jar();
//     var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
//     j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

//     const { Patnr } = req.query;
//     const urlEndpoint = String.raw`${config.apiEndpointIntegrationChemotherapy}/ManualLogSet?$filter=Patnr eq '${Patnr}'`;

//     const options = {
//         url: `${urlEndpoint}`,
//         headers: {
//             'User-Agent': 'request',
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'Cookie': mySAPSSO2Cookie,
//             'sap-client': config.client
//         },
//         jar: j
//     };

//     request.get(options, (error, response, body) => {
//         if (error) {
//     logger.log('error',error.message);
//             res.json({ message: err });
//             return console.dir(error);
//         }
//         else {
//             res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
//             res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
//             res.header('Access-Control-Expose-Headers', 'Content-Length');
//             res.header('Access-Control-Allow-Credentials', 'true');
//             res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
           
//if (response.statusCode == 401) {

//                 return res.status(response.statusCode).json(body);
//             }
//             else {
//                 return res.status(response.statusCode).json(JSON.parse(body));
//             }
//         }
//     });
// });

router.get("/getAttachDocument/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { Falnr } = req.query;
    const urlEndpoint = String.raw`${config.apiEndpointIntegrationChemotherapy}/DocAttachSet?$filter=Falnr eq '${Falnr}'`;

    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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

router.post("/postDocAttach/", async (req, res) => {
    const urlEndpoint = `${config.apiEndpointIntegrationChemotherapy}/DocAttachSet`;

    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    console.log(JSON.stringify(req.body));
    request({
        method: 'POST',
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
        console.log(response);
        console.log(JSON.stringify(body));
        if (error) {
             logger.log('error',error.message);
            res.json(error);
            return console.dir(error);
        }
        else {
            //console.log(body);
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
});


router.get("/Protocal/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { ProtoId, Patnr } = req.query;
    const urlEndpoint = String.raw`${config.apiEndpointIntegrationChemotherapy}/ProtocalSet?$filter=ProtoId eq '${ProtoId}'and Patnr eq '${Patnr}'&$expand=TOCYCLE,TOCHEMO,TOPREHDY,TOPOSTHDY,TOCHEMOPREMED,TOCHEMODISCH`;

    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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

router.post("/ChemoOrder/", async (req, res) => {
    const urlEndpoint = `${config.apiEndpointIntegrationChemotherapy}/ChemoOrderSet`;

    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    console.log(JSON.stringify(req.body));
    request({
        method: 'POST',
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
        console.log(response);
        console.log(JSON.stringify(body));
        if (error) {
             logger.log('error',error.message);
            res.json(error);
            return console.dir(error);
        }
        else {
            //console.log(body);
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
});

router.post("/ChemoEvents", async (req, res) => {
    const urlEndpoint = `${config.apiEndpointIntegrationChemotherapy}/GetEventsSet`;

    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    console.log(JSON.stringify(req.body));
    request({
        method: 'POST',
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
        console.log(response);
        console.log(JSON.stringify(body));
        if (error) {
             logger.log('error',error.message);
            res.json(error);
            return console.dir(error);
        }
        else {
            //console.log(body);
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
});

router.get("/getDiagnosisCodeSet/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { searchstring } = req.query;

    const urlEndpoint = String.raw`${baseDiagnosisURl}/DiagnosisCodeSet?$filter=(startswith(Dkey, '${searchstring}'))`;

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
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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
router.post("/updateFavoriteSurgery/", async (req, res) => {
    const urlEndpoint = String.raw`${config.apiEndpointIntegrationsurgery}/FavoriteSet`;

    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    request({
        method: 'POST',
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
        console.log(response);
        console.log(JSON.stringify(body));
        if (error) {
             logger.log('error',error.message);
            res.json(error);
            return console.dir(error);
        }
        else {
            //console.log(body);
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
});
router.post("/getFavoriteListSurgery/", async (req, res) => {
    const urlEndpoint = String.raw`${config.apiEndpointIntegrationsurgery}/FavoriteSet`;

    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    request({
        method: 'GET',
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
        console.log(response);
        console.log(JSON.stringify(body));
        if (error) {
             logger.log('error',error.message);
            res.json(error);
            return console.dir(error);
        }
        else {
            //console.log(body);
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
});

router.get("/eOrderFavoriteSet/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRCONSULTORDSRV}/FavoriteSet`;
    console.log(urlEndpoint)
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
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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

router.post("/eOrderFavoriteSetSave/", async (req, res) => {
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRCONSULTORDSRV}/FavoriteSet`;

    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    request({
        method: 'POST',
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
        console.log(response);
        console.log(JSON.stringify(body));
        if (error) {
             logger.log('error',error.message);
            res.json(error);
            return console.dir(error);
        }
        else {
            //console.log(body);
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
});
router.get("/protocolListget/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { ProtoId } = req.query;
    const urlEndpoint = String.raw`${config.apiEndpointIntegrationChemotherapy}/ProtocolF4Set`;

    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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

router.get("/cycleNolist/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { ProtoId } = req.query;
    const urlEndpoint = String.raw`${config.apiEndpointIntegrationChemotherapy}/CycleNoF4Set?$filter=ProtoId eq '${ProtoId}'`;

    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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


router.get("/ScalesList/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { Patnr } = req.query;
    const urlEndpoint = String.raw`${config.apiEndpointIntegrationPatScalesSet}/PatScalesSet?$filter=Patnr eq '${Patnr}'`;

    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: error });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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

router.post("/PriorToAdmissionSet/", async (req, res) => {
    const urlEndpoint = `${config.apiEndpointIntegrationPriorToAdmission}/PriorToAdmissionSet`;

    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    console.log(JSON.stringify(req.body));
    request({
        method: 'POST',
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
        console.log(response);
        console.log(JSON.stringify(body));
        if (error) {
             logger.log('error',error.message);
            res.json(error);
            return console.dir(error);
        }
        else {
            //console.log(body);
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
});

router.post("/CreateClinicConfigSet/", async (req, res) => {
    const urlEndpoint = `${config.apiEndpointIntegrationClinicConfig}/ClinicConfigSet`;
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    console.log(JSON.stringify(req.body));
    request({
        method: 'POST',
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
        if (error) {
             logger.log('error',error.message);
            res.json(error);
            return console.dir(error);
        }
        else {
            //console.log(body);
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
});

router.post("/updateClinicConfigSet/", async (req, res) => {
    const urlEndpoint = `${config.apiEndpointIntegrationClinicConfig}/ClinicConfigSet(Username='${req.body?.d?.Username}')`;
    console.log(urlEndpoint);
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    console.log(JSON.stringify(req.body));
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
        if (error) {
             logger.log('error',error.message);
            res.json(error);
            return console.dir(error);
        }
        else {
            //console.log(body);
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
});

router.get("/PriorToAdmissionget/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { Einri, Falnr } = req.query;
    const urlEndpoint = String.raw`${config.apiEndpointIntegrationOrderdetails}/PriorToAdmissionSet?$filter=Einri eq '${Einri}' and Falnr eq '${Falnr}'&$format=json`;

    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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
router.put("/OrderActionSet/", async (req, res) => {
    const { Meordid } = req.query;
    const urlEndpoint = `${config.apiEndpointIntegrationOrderdetails}/OrderActionSet(Meordid='${Meordid}')`;

    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    console.log(JSON.stringify(req.body));
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
             logger.log('error',error.message);
            res.json(error);
            return console.dir(error);
        }
        else {
            //console.log(body);
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
});

router.put("/EditAdmissionSet/", async (req, res) => {
    const { Meordid } = req.query;
    const urlEndpoint = `${config.apiEndpointIntegrationOrderdetails}/EditAdmissionSet(Meordid='${Meordid}')`;

    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    console.log(JSON.stringify(req.body));
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
             logger.log('error',error.message);
            res.json(error);
            return console.dir(error);
        }
        else {
            //console.log(body);
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
});

router.get("/OrderHistoryPatientSet/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });
    const urlEndpoint = String.raw`${config.apiEndpointIntegrationOrderdetails}/OrderHistoryPatientSet?$filter=Einri eq '${req.query.Einri}' and Patnr eq '${req.query.Patnr}'`;

    // console.log('url-----', baseURL + config.ZNISHMEDORDER_HIST_SRV + `/OrderHistoryPatientSet?$filter=Einri eq '${req.query.Einri}' and Patnr eq '${req.query.Patnr}'`);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    request({
        method: 'GET',
        uri: urlEndpoint,
        body: req.body,
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'sap-client': config.client,
            'Cookie': mySAPSSO2Cookie,

            //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
        }
    }, function (error, response, body) {
        if (error) {
             logger.log('error',error.message);
            res.json(error);
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            return res.status(response.statusCode).json(body);
        }
    })
});

router.get("/ApptgetSet/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { Tmndtge, Tmndtle, Pernr } = req.query;
    const urlEndpoint = String.raw`${config.apiEndpointIntegrationAppointments}/ApptSet?$filter=( Pernr eq '${Pernr}' ) and (Tmndt ge datetime'${Tmndtge}' and Tmndt le datetime'${Tmndtle}')&$format=json`;
    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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
router.get("/clinicConfigSet/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { Username } = req.query;
    const urlEndpoint = String.raw`${config.apiEndpointIntegrationClinicConfig}/ClinicConfigSet?$filter=Username eq '${Username}'&$format=json`;
    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };
    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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

router.get("/ExceptCheckedOut/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { einri, Erdat, datetime, Clinic, AttendPhy } = req.query;
    // Split Clinic and AttendPhy values into arrays
    // Prepare the Clinic filter condition
    const clinicArray = Clinic.trim().split(',').map(item => item.trim()).filter(item => item !== '');

    // Prepare the Clinic filter condition
    let clinicFilter;
    if (clinicArray.length === 1) {
        clinicFilter = `(Clinic eq '${clinicArray[0]}')`;
    } else {
        clinicFilter = `(${clinicArray.map(clinic => `Clinic eq '${clinic}'`).join(' or ')})`;
    }
    // Prepare the AttendPhy filter condition
    const attendPhyArray = AttendPhy.split(',').map(item => item.trim()).filter(item => item !== '' && item !== undefined);
    let attendPhyFilter;
    if (attendPhyArray.length === 1) {
        attendPhyFilter = `(AttendPhy eq '${attendPhyArray[0]}')`;
    } else {
        attendPhyFilter = `(${attendPhyArray.map(attendPhy => `AttendPhy eq '${attendPhy}'`).join(' or ')})`;
    }
    // Construct the URL endpoint with the updated filter conditions
    const urlEndpoint = String.raw`${config.apiEndpointIntegrationExceptCheckedOut}/ExceptCheckedOutSet?$filter=(Einri eq '${einri}' and (Erdat eq datetime'${Erdat}' or Erdat eq datetime'${datetime}') and (${clinicFilter}) and (${attendPhyFilter}))&$format=json`;
    // const urlEndpoint = String.raw`${config.apiEndpointIntegrationExceptCheckedOut}/ExceptCheckedOutSet?$filter=( Einri eq '${einri}' and ( Erdat eq datetime'${Erdat}' or Erdat eq datetime'${datetime}') and ( Clinic eq '${Clinic}') and ( AttendPhy eq '${AttendPhy}') )&$format=json`;
    // const urlEndpoint = String.raw`${config.apiEndpointIntegrationExceptCheckedOut}/ExceptCheckedOutSet?$filter=( Einri eq '1000' and ( Erdat eq datetime'2023-01-14T00:00:00' or Erdat eq datetime'2024-04-19T00:00:00' ) and ( Clinic eq 'CAROPAMC' or Clinic eq 'CAROPAMC' ) and ( AttendPhy eq '9000000000' or AttendPhy eq '9000000051' ) )&$format=json`;
    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };
    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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

router.get("/CheckedOut/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { einri, Erdat, datetime, Clinic, AttendPhy } = req.query;


    // Split Clinic and AttendPhy values into arrays
    const clinicArray = Clinic.split(',');
    const attendPhyArray = AttendPhy.split(',');

    // Prepare the Clinic filter condition
    let clinicFilter;
    if (clinicArray.length === 1) {
        clinicFilter = `(Clinic eq '${clinicArray[0]}')`;
    } else {
        clinicFilter = `(${clinicArray.map(clinic => `Clinic eq '${clinic}'`).join(' or ')})`;
    }

    // Prepare the AttendPhy filter condition
    let attendPhyFilter;
    if (attendPhyArray.length === 1) {
        attendPhyFilter = `(AttendPhy eq '${attendPhyArray[0]}')`;
    } else {
        attendPhyFilter = `(${attendPhyArray.map(attendPhy => `AttendPhy eq '${attendPhy}'`).join(' or ')})`;
    }
    
    let urlEndpoint = String.raw`${config.apiEndpointIntegrationExceptCheckedOut}/CheckedOutSet?$filter=(Einri eq '${einri}' and (Erdat eq datetime'${Erdat}' or Erdat eq datetime'${datetime}')`;
    if (clinicArray &&  clinicArray[0] != 'undefined') {
        urlEndpoint += ` and (${clinicFilter})`;
    }
    console.log(attendPhyFilter)
    if (attendPhyArray && attendPhyArray[0] != 'undefined') {
      urlEndpoint += ` and (${attendPhyFilter})`;
    }

    // Construct the URL endpoint with the updated filter conditions
    urlEndpoint += `)&$format=json`
    console.log('CheckedOutSet : urlEndpoint', urlEndpoint)


    // const urlEndpoint = String.raw`${config.apiEndpointIntegrationExceptCheckedOut}/CheckedOutSet?$filter=( Einri eq '${einri}' and ( Erdat eq datetime'${Erdat}' or Erdat eq datetime'${datetime}') and ( Clinic eq '${Clinic}') and ( AttendPhy eq '${AttendPhy}') )&$format=json`;
    // const urlEndpoint = String.raw`${config.apiEndpointIntegrationExceptCheckedOut}/CheckedOutSet?$filter=( Einri eq '1000' and ( Erdat eq datetime'2023-01-14T00:00:00' or Erdat eq datetime'2024-04-19T00:00:00' ) and ( Clinic eq 'CAROPAMC' or Clinic eq 'CAROPAMC' ) and ( AttendPhy eq '9000000000' or AttendPhy eq '9000000051' ) )&$format=json`;
    const options = {
        url: `${urlEndpoint}`,
        headers: {
            'User-Agent': 'request',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };
    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message);
            res.json({ message: err });
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-prescription-data.js`);
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
