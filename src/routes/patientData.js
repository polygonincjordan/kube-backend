const request = require('request');
const express = require("express");
const router = express.Router();
const axios = require("axios");
const config = require('../../config/env.config');
const logger = require('../../utils/logger');
const baseURL = `${config.apiEndpoint}:${config.apiEndpointPort}${config.apiSAPCatlogEndpoint}${config.apiPatientUserEndpoint}`;
const baseURLSoap = `${config.apiEndpoint}:${config.apiEndpointPort}${config.apiSAPCatlogEndpoint}${config.apiZNSOAPSRV}`;
router.use((req, res, next) => {
    console.log("Patient Data Middleware Time: ", Date.now());
    next();
});

router.get("/UserConfigSet", (req, res) => {

    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });
    const urlEndpoint = `${baseURL}/UserConfigSet('')?$format=json`
    const options = {
        url: urlEndpoint,
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
             logger.log('error',error.message)
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
                logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:patientData.js`);
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
router.put("/updateUserConfigSet/:vma", async (req, res) => {


    const { vma } = req.params;
    const urlEndpoint = `${baseURL}/UserConfigSet(VMA='${vma}')?sap-statistics=true&sap-client=${config.client}`;

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
             logger.log('error',error.message)
            res.json(error);
            return console.dir(error);
        }
        else {
            //console.log(body);
            if(response.statusCode != 200){
                logger.log('error',`${response.statusCode + ' ' + body}`)
              }
            return res.status(response.statusCode).json(body);
        }
    })
});

router.get("/PatientVisitDataSet/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { einri, patnr, showall, fromdate, todate,falnr } = req.query;

    let showallfilter = '';
    if (showall) {
        showallfilter = `and Showall eq '${showall}'`;
    }

    let datefilter = '';
    if (fromdate && todate) {
        datefilter = `and FromDate eq datetime'${fromdate}' and ToDate eq datetime'${todate}'`;
    }


    const urlEndpoint = String.raw`${baseURL}/PatientVisitDataSet?$filter=Einri eq '${einri}' and Patnr eq '${patnr}' ${showallfilter} ${datefilter} &$format=json`;

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
             logger.log('error',error.message)
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
                logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:patientData.js`);
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
router.get("/PatientVisitfalnrSet/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { einri, patnr, showall, fromdate, todate,falnr } = req.query;

    let showallfilter = '';
    if (showall) {
        showallfilter = `and Showall eq '${showall}'`;
    }

    let datefilter = '';
    if (fromdate && todate) {
        datefilter = `and FromDate eq datetime'${fromdate}' and ToDate eq datetime'${todate}'`;
    }


    const urlEndpoint = String.raw`${baseURL}/PatientVisitDataSet?$filter=Einri eq '${einri}' and Patnr eq '${patnr}' and Falnr eq '${falnr}' ${showallfilter} ${datefilter} &$format=json`;

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
             logger.log('error',error.message)
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
                logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:patientData.js`);
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
router.get("/getPatientVisitData/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { einri, patnr, docKey } = req.query;

    const urlEndpoint = String.raw`${baseURL}/PatientVisitDataSet?$filter=Einri eq '${einri}' and Patnr eq '${patnr}' and DocKey eq '${docKey}' &$expand=VISITTOATTACHMENTS,VISITTODIAGNOSIS&$format=json`;
console.log(urlEndpoint);
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
             logger.log('error',error.message)
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
                logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:patientData.js`);
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
router.get("/getSoapPatientVisitData/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { einri, falnr, docKey } = req.query;

    const urlEndpoint = String.raw`${baseURLSoap}/SoapSet?$filter=Dockey eq '${docKey}'`;

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
             logger.log('error',error.message)
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
                logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:patientData.js`);
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

router.get("/getAttachmentData/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { DocKey } = req.query;

    const urlEndpoint = String.raw`${baseURL}/AttachmentSet(DocKey='${DocKey}',FileID='')`;

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
             logger.log('error',error.message)
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
                logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:patientData.js`);
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


router.get("/getHistoryOfPatientData/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const {Einri,  DocKey } = req.query;

    const urlEndpoint = String.raw`${baseURL}/PatientDocumentHistorySet?$filter=Einri eq '${Einri}' and DocKey eq '${DocKey}'`;
    console.log(urlEndpoint, "urlEndpoint");
    
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
             logger.log('error',error.message)
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
                logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:patientData.js`);
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
