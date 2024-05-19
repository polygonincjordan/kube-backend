const request = require('request');
const express = require("express");
const router = express.Router();
const axios = require("axios");
const config = require('../../config/env.config');
const baseURL = `${config.apiEndpoint}:${config.apiEndpointPort}${config.apiSAPCatlogEndpoint}${config.apiPatientUserEndpoint}`;
const baseURLForSoap = `${config.apiEndpoint}:${config.apiEndpointPort}${config.apiSAPCatlogEndpoint}${config.apiZNSOAPSRV}`;
const logger = require('../../utils/logger');
router.use((req, res, next) => {
    console.log("Patient Data Middleware Time: ", Date.now());
    next();
});

// Modify one Catalog of Vital
router.post("/savePatientVisitDataSet", async (req, res) => {
    const urlEndpoint = `${baseURLForSoap}/SoapSet`;

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
            res.json(error);
            logger.log('error',error.message)
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
router.put("/updatePatientVisitDataSet", async (req, res) => {
    const urlEndpoint = `${baseURLForSoap}/SoapSet(Dockey='${req.body.Dockey}')`;

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
        console.log(response);
        console.log(JSON.stringify(body));
        if (error) {
            res.json(error);
            logger.log('error',error.message)
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
router.delete("/deletePatientVisitDataSet/:docKey", async (req, res) => {
    const { docKey,etag } = req.params;
    console.log(docKey, "docKey")
    const urlEndpoint = `${baseURLForSoap}/SoapSet(Dockey='${docKey}')`;

    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    console.log(JSON.stringify(req.body));
    request({
        method: 'DELETE',
        uri: urlEndpoint,
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'If-Match': `W/"\'${etag}\'"`,
            'sap-client': config.client,
            'Cookie': mySAPSSO2Cookie,
        }
    }, function (error, response, body) {
        console.log(response);
        console.log(JSON.stringify(body));
        if (error) {
            res.json(error);
            logger.log('error',error.message)
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
router.put("/toReleaseSoapPatientVisitData", async (req, res) => {
    const urlEndpoint = `${baseURLForSoap}/SoapSet(Dockey='${req.body.Dockey}')`;
console.log('toReleaseSoapPatientVisitData',urlEndpoint);
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
        console.log(response);
        console.log(JSON.stringify(body));
        if (error) {
            res.json(error);
            logger.log('error',error.message)
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
router.post("/saveVisitnotePatientVisitDataSet", async (req, res) => {
    const urlEndpoint = `${baseURL}/PatientVisitDataSet`;
    console.log('saveVisitnotePatientVisitDataSet',urlEndpoint)
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
            res.json(error);
            logger.log('error',error.message)
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
router.delete("/deleteVisitnotePatientVisitDataSet/:docKey/:etag", async (req, res) => {
    const { docKey,etag } = req.params;
    console.log(docKey, "docKey")
    const urlEndpoint = `${baseURL}/PatientVisitDataSet(DocKey='${docKey}')`;

    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    console.log(JSON.stringify(req.body));
    request({
        method: 'DELETE',
        uri: urlEndpoint,
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'If-Match': `W/"\'${etag}\'"`,
            'sap-client': config.client,
            'Cookie': mySAPSSO2Cookie,
        }
    }, function (error, response, body) {
        console.log(response);
        console.log(JSON.stringify(body));
        if (error) {
            res.json(error);
            logger.log('error',error.message)
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
module.exports = router;
