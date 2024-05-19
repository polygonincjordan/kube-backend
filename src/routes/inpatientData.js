const request = require('request');
const express = require("express");
const router = express.Router();
const axios = require("axios");
const config = require('../../config/env.config');
const logger = require('../../utils/logger');
const baseURL = `${config.apiEndpoint}:${config.apiEndpointPort}${config.apiSAPCatlogEndpoint}${config.apiPatientUserEndpoint}`;
const baseDocumentURl = `${config.apiEndpoint}:${config.apiEndpointPort}${config.apiSAPCatlogEndpoint}${config.apiZNPATIENTDOCUMENTSRV}`;
const baseDischargeURl = `${config.apiEndpoint}:${config.apiEndpointPort}${config.apiSAPCatlogEndpoint}${config.apiDischargeSummarySet}`;
const baseDiagnosisURl = `${config.apiEndpoint}:${config.apiEndpointPort}${config.apiSAPCatlogEndpoint}${config.apiZABEMRDIAGNOSISSRV}`;

router.use((req, res, next) => {
    console.log("Patient Data Middleware Time: ", Date.now());
    next();
});

router.get("/getInPatientAllDocumentSet/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { einri, patnr,falnr} = req.query;
    
    const urlEndpoint = String.raw`${baseURL}/PatientDocumentSet?$filter=Einri eq '${einri}' and Patnr eq '${patnr}' &$format=json`;

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
                logger.log('error',`${response.statusCode + ' ' + body}`)
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
router.get("/getInPatientAllDocumentFalnrSet/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { einri, patnr,falnr} = req.query;
    
    const urlEndpoint = String.raw`${baseURL}/PatientDocumentSet?$filter=Einri eq '${einri}' and Patnr eq '${patnr}' and Falnr eq '${falnr}' &$format=json`;

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
          logger.log('error',`${response.statusCode + ' ' + body}`)
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
router.get("/getInPatientDocumentSet/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { einri, patnr, docKey } = req.query;
    
    const urlEndpoint = String.raw`${baseDocumentURl}/PatientDocumentSet('${docKey}')?$expand=PATDOCTOOPERRPTDOCDETAIL,PATDOCTOSURGICALTEAM,PATDOCTOPREOPERATIVEDX,PATDOCTOPOSTOPERATIVEDX,DOCCATTOATTACHMENTS&$format=json`;

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
          logger.log('error',`${response.statusCode + ' ' + body}`)
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


router.get("/getPatientCaseSet/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { einri, patnr } = req.query;
    
    const urlEndpoint = String.raw`${baseURL}/PatientCaseSet?$filter=Einri eq '${einri}' and Patient eq '${patnr}' &$format=json`;

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
          logger.log('error',`${response.statusCode + ' ' + body}`)
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

router.post("/saveInPatientDataSet/", async (req, res) => {
    const urlEndpoint = `${baseDocumentURl}/PatientDocumentSet`;

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

router.delete("/deleteInPatientData/:docKey", async (req, res) => {
    const { docKey } = req.params;
    console.log(docKey, "docKey")
    const urlEndpoint = `${baseDocumentURl}/PatientDocumentSet(DocKey='${docKey}')`;

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
            'sap-client': config.client,
            'Cookie': mySAPSSO2Cookie,
        }
    }, function (error, response, body) {
        console.log(response);
        console.log(JSON.stringify(body));
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

router.get("/getDiagnosisData/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { Institution, PatientNumber, CaseNumber} = req.query;
    
    const urlEndpoint = String.raw`${baseDocumentURl}/F4DiagnosisSet?$filter=Institution eq '${Institution}' and PatientNumber eq '${PatientNumber}' and CaseNumber eq '${CaseNumber}'&$format=json`;

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
          logger.log('error',`${response.statusCode + ' ' + body}`)
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

router.get("/getSurgeryTeamData/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { SequenceNumberMovem, CaseNumber} = req.query;
    
    const urlEndpoint = String.raw`${baseDocumentURl}/F4SurgicalTeamSet?$filter=SequenceNumberMovem eq '${SequenceNumberMovem}' and CaseNumber eq '${CaseNumber}' &$format=json`;

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
          logger.log('error',`${response.statusCode + ' ' + body}`)
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

router.get("/getDischargeSummarySet/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { Einri, Falnr} = req.query;
    
    const urlEndpoint = String.raw`${baseDischargeURl}/DischargeSummarySet?$filter=( Einri eq '${Einri}' and Falnr eq '${Falnr}')`;

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
          logger.log('error',`${response.statusCode + ' ' + body}`)
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


router.post("/saveReleaseDischargeSummarySet/", async (req, res) => {
    const urlEndpoint = `${baseDischargeURl}/DischargeSummarySet`;

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


router.post("/releaseDischargeSummarySet/", async (req, res) => {
    const { DocKey} = req.query;
    const urlEndpoint = `${baseDischargeURl}/DocRelease?DocKey='${DocKey}'`;

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

router.get("/savedDocumentGetData/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { DocKey} = req.query;
    
    const urlEndpoint = `${baseDischargeURl}/DischargeSummarySet?$expand=ToFormData,ToDiagnosis,ToHospitalMed,ToDischargeMed&$filter=(Dockey eq '${DocKey}')`;

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
          logger.log('error',`${response.statusCode + ' ' + body}`)
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

router.delete("/deleteDischargeSummarySet/", async (req, res) => {
    const { DocKey } = req.query;
    const urlEndpoint = `${baseDischargeURl}/DischargeSummarySet('${DocKey}')`;

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
            'sap-client': config.client,
            'Cookie': mySAPSSO2Cookie,
        }
    }, function (error, response, body) {
        console.log(response);
        console.log(JSON.stringify(body));
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

router.get("/getDiagnosisCodeSet/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { searchstring} = req.query;
    
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
          logger.log('error',`${response.statusCode + ' ' + body}`)
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

router.get("/getDiagnosisSet/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const { institutionid , caseid, patnr } = req.query;

    let urlEndpoint = String.raw`${baseDiagnosisURl}/DiagnosisSet?$filter=(Institution eq '${institutionid}' and Patcaseid eq '${caseid}')`;
  
    if(patnr){
        urlEndpoint = String.raw`${baseDiagnosisURl}/DiagnosisSet?$filter=(Patnr eq '${patnr}')`;  
    }


    const options = {
        url: `${urlEndpoint}`,
        headers: {
            "User-Agent": "request",
            spnego: "disabled",
            Accept: "application/json",
            "Content-Type": "application/json",
            Cookie: mySAPSSO2Cookie,
            "sap-client": config.client,
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
                logger.log('error',`${response.statusCode + ' ' + body}`)
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
