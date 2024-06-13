const request = require('request');
const config = require('../../config/env.config');
const { response } = require('express');
const url = require('url');
const querystring = require('querystring');
const cookieLocal = require('cookie');
const logger = require('../../utils/logger');

const baseURL = `${config.apiEndpoint}:${config.apiEndpointPort}${config.apiSAPCatlogEndpoint}`;
exports.getOrderSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRORDSETSRV}/OrderSetHeaderSet?$expand=ToMedOrd,ToPhyOrd,ToLab,ToRad,ToServices,ToSurgy,ToAdm&$filter=( Einri eq '${req.body.einri}' and Falnr eq '${req.body.falnr}' )`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getOrderSetBySubtitles = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRORDSETSRV}/OrderSetHeaderSet?$filter=( Id eq '${req.body.Id}' and Stid eq '${req.body.Stid}' )&$expand=ToDiag,ToAccess,ToMedOrd/ToMedComplex,ToPhyOrd,ToLab,ToRad,ToServices,ToNdia,ToAdm,ToSurgy`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.createOrderSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRORDSETSRV}/OrderSetOrderSet`
    request({
        method: 'POST',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getFavSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRORDSETSRV}/OrderSetFavrSet`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getOrderSetByFavId = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRORDSETSRV}/OrderSetHeaderSet?$filter=( Id eq '${req.body.Id}' )&$expand=ToFavr,ToMedOrd,ToPhyOrd,ToLab,ToRad,ToServices`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.emergencyListSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNEMERGENCYDASHBOARDSRV}/EmergencyListSet?$filter=(Einri eq '1000' and ( Erdat eq datetime'${req.body.fromDate}' or Erdat eq datetime'${req.body.toDate}') and History eq ${req.body.History})`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.emergencyListCheckInSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNEMERGENCYDASHBOARDSRV}/EmergencyListSet?$filter=(History eq ${req.body.History})`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.dayCaseListCheckInSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRDAYCARESRV}/MainListSet?$filter=( Bwidt eq datetime'${req.body.fromDate}')&$format=json`
    console.log(urlEndpoint);
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body.error}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.assignToMe = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRNURSESRV}/NurseAssignSet?`
    request({
        method: 'POST',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.nursingLabListSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);


    let isMultipleFilter = false;
    let deptcodefilter = '';
    if (req.body.Deptcode) {
        isMultipleFilter = true;
        deptcodefilter = `Deptcode eq '${req.body.Deptcode}'`;
    }
    let roomfilter = '';
    if (req.body.ROOM1) {
        isMultipleFilter = true;
        roomfilter = `Behraum eq '${req.body.ROOM1}'`;
    }

    let Behpersonfilter = '';
    if (req.body.Behperson) {
        Behpersonfilter = isMultipleFilter ? ` and ` : '';
        isMultipleFilter = true;
        Behpersonfilter += `Behperson eq '${req.body.Behperson}'`;
    }

    let Posstatusfilter = '';
    if (req.body.Posstatus) {
        Posstatusfilter = isMultipleFilter ? ` and ` : '';
        isMultipleFilter = true;
        Posstatusfilter += `Posstatus eq '${req.body.Posstatus}'`;
    }

    let dateFromfilter = '';
    if (req.body.fromDate) {
        dateFromfilter = isMultipleFilter ? ` and ` : '';
        isMultipleFilter = true;
        dateFromfilter += `(Datum ge datetime'${req.body.fromDate}' and Datum le datetime'${req.body.toDate}')`;
    }

    let allFIlter = '';
    if (deptcodefilter || roomfilter || Behpersonfilter || Posstatusfilter || dateFromfilter) {
        allFIlter = `?$filter=(${deptcodefilter}${roomfilter}${Behpersonfilter}${Posstatusfilter}${dateFromfilter})`;
    }
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRNURSESRV}/LabExtractionSet${allFIlter}` 

    //    const { Behperson } = req.query;

    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.MedicationAdministrationSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMGYWRKLISTSRV}/NotAdminMEEventsSet?$filter=(( Bwidt ge datetime'${req.query.fromDate}' and Bwidt le datetime'${req.query.toDate}'))&$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.actionlistSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    console.log(baseURL + config.apiZNNURSINGACTIONEMARSRV + "/AdministerSet")
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNNURSINGACTIONEMARSRV}/AdministerSet`
    request({
        method: 'POST',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
// print order
exports.nursingLabListPrintSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRNURSESRV}/LabelPrintUrlSet?$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.nursingLabSampleCollectedSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRNURSESRV}/SampleCollected?Vkgid='${req.query.vkgid}'`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
//count
exports.getCountField = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    var ipCount = `/LabExtractionSet/$count`;
    const urlEndpoint = config.apiEndpointEMRInPatient + config.apiZABEMRNURSESRV + ipCount
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
            res.json(error);
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            var newBody = {
                count: body,
                module: req.body.module
            }
             if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(newBody);
        }
    })
}
exports.triagePriorityList = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNEMERGENCYDASHBOARDSRV}/TriagePriotyCrtUpdSet?$filter=(Patnr eq '${req.body.patnr}' and Falnr eq '${req.body.falnr}')&$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.saveTriage = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNEMERGENCYDASHBOARDSRV}/TriagePriotyCrtUpdSet`
    request({
        method: 'POST',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.patientsListSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMGYWRKLISTSRV}"/PatientsListSet`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.actionPhysicianSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMGYWRKLISTSRV}/ActionPhysicianSet`
    request({
        method: 'POST',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getRiskList = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNEMERGENCYDASHBOARDSRV}/PatRiskFctrListSet?$filter=Einri eq '${req.body.einri}' and Patnr eq '${req.body.patnr}'`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getRiskValues = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNEMERGENCYDASHBOARDSRV}/RiskFctMastrListSet?$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.saveRiskList = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNEMERGENCYDASHBOARDSRV}/PatRiskHdrSet`
    console.log(req.body);
    request({
        method: 'POST',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getCancelReasons = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNEMERGENCYDASHBOARDSRV}/AllergyCancelReasonSet?`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getAllergenValues = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNEMERGENCYDASHBOARDSRV}/AllergenMstrSet?$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getAllergenGroupValues = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNEMERGENCYDASHBOARDSRV}/AllergnGroupMstSet?$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getAllergyCertaintyValues = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNEMERGENCYDASHBOARDSRV}/AllergyCertaintyMstSet?$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getAllergyEvaluationValues = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNEMERGENCYDASHBOARDSRV}/AllergyEvaluMstrSet?$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getAllergyReactionValues = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNEMERGENCYDASHBOARDSRV}/AllergyReactionMstSet?$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getSeverityValues = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNEMERGENCYDASHBOARDSRV}/AllergyReatSevrtMstSet?$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getAllergyTypeValues = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNEMERGENCYDASHBOARDSRV}/AllergyTypeMstSet?$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getAllergyHistory = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNEMERGENCYDASHBOARDSRV}/PatAllergyHdrSet?$expand=PatAllergyHdrToItmNav&$filter=Patnr eq '${req.body.patnr}' &$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.SaveAllergyHistory = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNEMERGENCYDASHBOARDSRV}/PatAllergyHdrSet`
    request({
        method: 'POST',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getPatientLabHistory = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMGYWRKLISTSRV}/PatLabOrdListSet?$filter=(Einri eq '${req.body.einri}' and Patnr eq '${req.body.patnr}')&$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getPatientRadHistory = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMGYWRKLISTSRV}/PatRadOrdListSet?$filter=(Einri eq '${req.body.einri}' and Patnr eq '${req.body.patnr}')&$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getErRadPdf = (req, res) => {
    console.log(req);
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNISHMEDDOCATTACHMENTSRV}/DOCATTSET('${req.body.key}')/$value`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getMedCompletedHistory = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMGYWRKLISTSRV}/PatMedOrdListSet?$filter=(Einri eq '${req.body.einri}' and Mrn eq '${req.body.patnr}')&$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getMedNotCompletedHistory = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMGYWRKLISTSRV}/PatMisMedOrdListSet?$filter=(Einri eq '${req.body.einri}' and Mrn eq '${req.body.patnr}')&$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getVitalList = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNVITALSIGNSSRV}/VitalSignSet?$filter=(Patnr eq '${req.body.patnr}' and Falnr eq '${req.body.falnr}' and Einri eq '${req.body.einri}' and Lfdnr eq '${req.body.lfdnr}')&$expand=TOITEM&$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.deleteVitalList = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNVITALSIGNSSRV}/VitalSignSet`
    request({
        method: 'POST',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.updateVitalSigns = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNVITALSIGNSSRV}/VitalSignSet`
    request({
        method: 'POST',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.createVitalSigns = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNVITALSIGNSSRV}/VitalSignSet`
    request({
        method: 'POST',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.deleteReasonsList = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNVITALSIGNSSRV}/CancellationReasonSet?$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getAllVitalList = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNVITALSIGNSSRV}/VitalSignListSet?$filter=Einri eq '${req.body.einri}'&$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
// documents
exports.getLatestAssessment = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNERPHYSDOCSRV}/LatestDocSet?$filter=( Einri eq '${req.body.Einri}' and Falnr eq '${req.body.Falnr}' and Patnr eq '${req.body.Patnr}' and Lfdnr eq '${req.body.Lfdnr}')`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getPhyAssessment = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNERPHYSDOCSRV}/ErPhysDocSet?$filter=( Einri eq '${req.body.Einri}' and Falnr eq '${req.body.Falnr}' )`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.createPhyDoc = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNERPHYSDOCSRV}/ErPhysDocSet`
    request({
        method: 'POST',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.updatePhyDoc = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNERPHYSDOCSRV}/ErPhysDocSet(Dockey='${req.body.Dockey}')`
    request({
        method: 'PUT',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.releasePhyDoc = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNERPHYSDOCSRV}/ErPhysDocSet(Dockey='${req.body.Dockey}')`
    request({
        method: 'PUT',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getReleasedPdf = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNERPHYSDOCSRV}/PDFFileSet(Dockey='${req.body.Dockey}')`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.deletePhyAssessment = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNERPHYSDOCSRV}/ErPhysDocSet(Dockey='${req.body.Dockey}')`
    request({
        method: 'DELETE',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
// patient search
exports.PatientSearchSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNEMERGENCYDASHBOARDSRV}/PatientsSet?$expand=ToVisitsHistory&$filter=(Patnr eq '${req.body.Patnr}' and Vname eq '${req.body.Vname}' and Nname eq '${req.body.Nname}' and Telnr eq '${req.body.Telnr}' )`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
//Medical report
exports.getMedLatestAssessment = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNMEDREPORTSRV}/LatestDocSet?$filter=( Einri eq '${req.body.Einri}' and Falnr eq '${req.body.Falnr}' and Patnr eq '${req.body.Patnr}' and Lfdnr eq '${req.body.Lfdnr}')`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getMedReportData = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNMEDREPORTSRV}/MedReportSet?$filter=( Dockey  eq '${req.body.Dockey}')`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.createMedDoc = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNMEDREPORTSRV}/MedReportSet`
    request({
        method: 'POST',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.deleteMedReport = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNMEDREPORTSRV}/MedReportSet(Dockey='${req.body.Dockey}')`
    request({
        method: 'DELETE',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.updateMedDoc = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNMEDREPORTSRV}/MedReportSet(Dockey='${req.body.Dockey}')`
    request({
        method: 'PUT',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.releaseMedDoc = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNMEDREPORTSRV}/MedReportSet(Dockey='${req.body.Dockey}')`
    request({
        method: 'PUT',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getMedReleasedPdf = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNMEDREPORTSRV}/PDFFileSet(Dockey='${req.body.Dockey}')`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
//    analysis
exports.getAnalysisDetails = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZEMERGENCYANALYSISSRV}/EmergencyPatientSet?$filter=Date1 eq datetime'${req.body.fromDate}' and Date2 eq datetime'${req.body.toDate}'&$expand=TOROADMAP,TOHOURLYPAT,TOZONESTAT&$format=json`

    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
//    er bed
exports.getErBedList = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNROOMASSIGNSRV}/RoomSet`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.SaveBedForPatient = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNROOMASSIGNSRV}/AssignRoomSet`
    request({
        method: 'POST',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
// change password
exports.changePassword = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZABUSERMGMTSRV}/ChangePasswordSet`
    request({
        method: 'POST',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.getLevelOrderHistory = (req, res) => {

    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    let dateFromfilter = '';
    if (req.query.fromDate) {
        dateFromfilter += `( Bwidt ge datetime'${req.query.fromDate}' and Bwidt le datetime'${req.query.toDate}')`;
    }
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMGYWRKLISTSRV}/NotAdminMEEventsSet?$filter=${dateFromfilter}&$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.actionlistSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNNURSINGACTIONEMARSRV}/AdministerSet`
    request({
        method: 'POST',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
// print order
exports.nursingLabListPrintSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRNURSESRV}/LabelPrintUrlSet?$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.nursingLabSampleCollectedSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRNURSESRV}/SampleCollected?Vkgid='${req.body.Vkgid}'`
    request({
        method: 'POST',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
//count
exports.getCountField = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    var ipCount = `/LabExtractionSet/$count?$filter=(Datum ge datetime'${req.query.fromDate}' and Datum le datetime'${req.query.toDate}')`;
    const urlEndpoint = config.apiEndpointEMRInPatient + config.apiZABEMRNURSESRV + ipCount
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
            res.json(error);
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            var newBody = {
                count: body,
                module: req.body.module
            }
             if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(newBody);
        }
    })
}
exports.MedicationAdministrationCount = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    var ipCount = `/NotAdminMEEventsSet/$count`;
    const urlEndpoint = baseURL + config.apiZABEMGYWRKLISTSRV + ipCount
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
            res.json(error);
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            var newBody = {
                count: body,
                module: req.body.module
            }
             if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(newBody);
        }
    })
}

exports.NoConsumablesSetCount = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    var ipCount = `/NoConsumablesSet/$count?$filter=(Bwidt ge datetime'${req.query.fromDate}' and Bwidt le datetime'${req.query.toDate}')
    `;
    const urlEndpoint = baseURL + config.apiZABEMGYWRKLISTSRV + ipCount
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
            res.json(error);
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            var newBody = {
                count: body,
                module: req.body.module
            }
             if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(newBody);
        }
    })
}
exports.triagePriorityList = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNEMERGENCYDASHBOARDSRV}/TriagePriotyCrtUpdSet?$filter=(Patnr eq '${req.body.patnr}' and Falnr eq '${req.body.falnr}')&$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.saveTriage = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNEMERGENCYDASHBOARDSRV}/TriagePriotyCrtUpdSet`
    request({
        method: 'POST',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.patientsListSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMGYWRKLISTSRV}/PatientsListSet`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.actionPhysicianSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMGYWRKLISTSRV}/ActionPhysicianSet`
    request({
        method: 'POST',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getRiskList = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNEMERGENCYDASHBOARDSRV}/PatRiskFctrListSet?$filter=Einri eq '${req.body.einri}' and Patnr eq '${req.body.patnr}'`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getRiskValues = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNEMERGENCYDASHBOARDSRV}/RiskFctMastrListSet?$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.saveRiskList = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNEMERGENCYDASHBOARDSRV}/PatRiskHdrSet`
    request({
        method: 'POST',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getCancelReasons = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNEMERGENCYDASHBOARDSRV}/AllergyCancelReasonSet?`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getAllergenValues = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNEMERGENCYDASHBOARDSRV}/AllergenMstrSet?$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getAllergenGroupValues = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNEMERGENCYDASHBOARDSRV}/AllergnGroupMstSet?$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getAllergyCertaintyValues = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNEMERGENCYDASHBOARDSRV}/AllergyCertaintyMstSet?$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getAllergyEvaluationValues = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNEMERGENCYDASHBOARDSRV}/AllergyEvaluMstrSet?$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getAllergyReactionValues = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNEMERGENCYDASHBOARDSRV}/AllergyReactionMstSet?$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getSeverityValues = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNEMERGENCYDASHBOARDSRV}/AllergyReatSevrtMstSet?$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getAllergyTypeValues = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNEMERGENCYDASHBOARDSRV}/AllergyTypeMstSet?$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getAllergyHistory = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNEMERGENCYDASHBOARDSRV}/PatAllergyHdrSet?$expand=PatAllergyHdrToItmNav&$filter=Patnr eq '${req.body.patnr}' &$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.SaveAllergyHistory = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNEMERGENCYDASHBOARDSRV}/PatAllergyHdrSet`
    request({
        method: 'POST',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getPatientLabHistory = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMGYWRKLISTSRV}/PatLabOrdListSet?$filter=(Einri eq '${req.body.einri}' and Patnr eq '${req.body.patnr}')&$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getPatientRadHistory = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMGYWRKLISTSRV}/PatRadOrdListSet?$filter=(Einri eq '${req.body.einri}' and Patnr eq '${req.body.patnr}')&$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getErRadPdf = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNISHMEDDOCATTACHMENTSRV}/DOCATTSET('${req.body.key}')/$value`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getMedCompletedHistory = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMGYWRKLISTSRV}/PatMedOrdListSet?$filter=(Einri eq '${req.body.einri}' and Mrn eq '${req.body.patnr}')&$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getMedNotCompletedHistory = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMGYWRKLISTSRV}/PatMisMedOrdListSet?$filter=(Einri eq '${req.body.einri}' and Mrn eq '${req.body.patnr}')&$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getVitalList = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNVITALSIGNSSRV}/VitalSignSet?$filter=(Patnr eq '${req.body.patnr}' and Falnr eq '${req.body.falnr}' and Einri eq '${req.body.einri}' and Lfdnr eq '${req.body.lfdnr}')&$expand=TOITEM&$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.deleteVitalList = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNVITALSIGNSSRV}/VitalSignSet`
    request({
        method: 'POST',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.updateVitalSigns = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNVITALSIGNSSRV}/VitalSignSet`
    request({
        method: 'POST',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.createVitalSigns = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNVITALSIGNSSRV}/VitalSignSet`
    request({
        method: 'POST',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.deleteReasonsList = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNVITALSIGNSSRV}/CancellationReasonSet?$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getAllVitalList = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNVITALSIGNSSRV}/VitalSignListSet?$filter=Einri eq '${req.body.einri}'&$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
// documents
exports.getLatestAssessment = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNERPHYSDOCSRV}/LatestDocSet?$filter=( Einri eq '${req.body.Einri}' and Falnr eq '${req.body.Falnr}' and Patnr eq '${req.body.Patnr}' and Lfdnr eq '${req.body.Lfdnr}')`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getPhyAssessment = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNERPHYSDOCSRV}/ErPhysDocSet?$filter=( Einri eq '${req.body.Einri}' and Falnr eq '${req.body.Falnr}' )`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.createPhyDoc = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNERPHYSDOCSRV}/ErPhysDocSet`
    request({
        method: 'POST',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.updatePhyDoc = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNERPHYSDOCSRV}/ErPhysDocSet(Dockey='${req.body.Dockey}')`
    request({
        method: 'PUT',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.releasePhyDoc = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNERPHYSDOCSRV}/ErPhysDocSet(Dockey='${req.body.Dockey}')`
    request({
        method: 'PUT',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getReleasedPdf = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNERPHYSDOCSRV}/PDFFileSet(Dockey='${req.body.Dockey}')`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.deletePhyAssessment = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNERPHYSDOCSRV}/ErPhysDocSet(Dockey='${req.body.Dockey}')`
    request({
        method: 'DELETE',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
// patient search
exports.PatientSearchSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNEMERGENCYDASHBOARDSRV}/PatientsSet?$expand=ToVisitsHistory&$filter=(Patnr eq '${req.body.Patnr}' and Vname eq '${req.body.Vname}' and Nname eq '${req.body.Nname}' and Telnr eq '${req.body.Telnr}' )`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
//Medical report
exports.getMedLatestAssessment = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNMEDREPORTSRV}/LatestDocSet?$filter=( Einri eq '${req.body.Einri}' and Falnr eq '${req.body.Falnr}' and Patnr eq '${req.body.Patnr}' and Lfdnr eq '${req.body.Lfdnr}')`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getMedReportData = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNMEDREPORTSRV}/MedReportSet?$filter=( Dockey  eq '${req.body.Dockey}')`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.createMedDoc = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNMEDREPORTSRV}/MedReportSet`
    request({
        method: 'POST',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.deleteMedReport = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNMEDREPORTSRV}/MedReportSet(Dockey='${req.body.Dockey}')`
    request({
        method: 'DELETE',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.updateMedDoc = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNMEDREPORTSRV}/MedReportSet(Dockey='${req.body.Dockey}')`
    request({
        method: 'PUT',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.releaseMedDoc = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNMEDREPORTSRV}/MedReportSet(Dockey='${req.body.Dockey}')`
    request({
        method: 'PUT',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getMedReleasedPdf = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNMEDREPORTSRV}/PDFFileSet(Dockey='${req.body.Dockey}')`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
//    analysis
exports.getAnalysisDetails = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZEMERGENCYANALYSISSRV}/EmergencyPatientSet?$filter=Date1 eq datetime'${req.body.fromDate}' and Date2 eq datetime'${req.body.toDate}'&$expand=TOROADMAP,TOHOURLYPAT,TOZONESTAT&$format=json`

    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
//    er bed
exports.getErBedList = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNROOMASSIGNSRV}/RoomSet`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.SaveBedForPatient = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNROOMASSIGNSRV}/AssignRoomSet`
    request({
        method: 'POST',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
// change password
exports.changePassword = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZABUSERMGMTSRV}/ChangePasswordSet`
    request({
        method: 'POST',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.getLevelOrderHistory = (req, res) => {

    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.ZNISHMEDORDER_HIST_SRV}/OrderHistorySet?$filter=Einri eq '${req.query.einri}' and Falnr eq '${req.query.falnr}'&$format=json`
    
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.getMaterialSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const { searchstring } = req.query;
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRMDSRV}/MaterialSet?$filter=(startswith(Matnr, '${searchstring}'))`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.getMaterialStockSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const { searchstring } = req.query;
    const urlEndpoint = String.raw`${baseURL}${config.apiZNEMERGENCYDASHBOARDSRV}/MaterialStockSet?$filter=(Matnr eq '${JSON.parse(searchstring).enteredValue}' and Lgort eq '${JSON.parse(searchstring).location}')`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.saveConsumableDataSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNEMERGENCYDASHBOARDSRV}/PatMatCosmpNmm7HdSet`
    request({
        method: 'POST',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}


exports.getConsumablesHistory = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    const { searchstring } = req.query;
    const urlEndpoint = baseURL + config.apiZNPATMATCONSUMSRV + `/PatMatConsumSet?$filter=Falnr eq '${searchstring}' and Sloc eq 'ER01'&$format=json`;
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.getNoConsumablesSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const { searchstring } = req.query;
    const urlEndpoint  = baseURL + config.apiZABEMGYWRKLISTSRV + `/NoConsumablesSet?$format=json`;
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

// nursing emergancy traige face pain create API
exports.nurEmrFaceScaleSetPost = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies["MYSAPSSO2"]);
    let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNSCALESSRV}/FaceScaleSet`
    request(
        {
            method: "POST",
        uri:`${urlEndpoint}`,
            body: req.body,
            json: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "sap-client": config.client,
                Cookie: mySAPSSO2Cookie,
            },
        },
        function (error, response, body) {
            if (error) {
                logger.log('error', error.message)
                res.json(error);
                return console.dir(error);
            } else {
                res.header("Access-Control-Allow-Origin", config.AllowOriginDomain);
                res.header(
                    "Access-Control-Allow-Methods",
                    "GET,HEAD,PUT,PATCH,POST,DELETE"
                );
                res.header("Access-Control-Expose-Headers", "Content-Length");
                res.header("Access-Control-Allow-Credentials", "true");
                res.header(
                    "Access-Control-Allow-Headers",
                    "Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials"
                );
                if(response.statusCode != 200){
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
                }
                return res.status(response.statusCode).json(body);
            }
        }
    );
};

// nursing emergancy traige glowgos  API
exports.nurEmrGlasgowScaleSetPost = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies["MYSAPSSO2"]);
    let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNSCALESSRV}/GlasgowScaleSet`

    request(
        {
            method: "POST",
        uri:`${urlEndpoint}`,
            body: req.body,
            json: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "sap-client": config.client,
                Cookie: mySAPSSO2Cookie,
            },
        },
        function (error, response, body) {
            if (error) {
                logger.log('error', error.message)
                res.json(error);
                return console.dir(error);
            } else {
                res.header("Access-Control-Allow-Origin", config.AllowOriginDomain);
                res.header(
                    "Access-Control-Allow-Methods",
                    "GET,HEAD,PUT,PATCH,POST,DELETE"
                );
                res.header("Access-Control-Expose-Headers", "Content-Length");
                res.header("Access-Control-Allow-Credentials", "true");
                res.header(
                    "Access-Control-Allow-Headers",
                    "Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials"
                );
                if(response.statusCode != 200){
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
                }
                return res.status(response.statusCode).json(body);
            }
        }
    );
};

// nursing emergancy traige numeric rating POST  API
exports.nurEmrNumericScaleSetPost = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies["MYSAPSSO2"]);
    let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNSCALESSRV}/NRSScaleSet`

    request(
        {
            method: "POST",
        uri:`${urlEndpoint}`,
            body: req.body,
            json: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "sap-client": config.client,
                Cookie: mySAPSSO2Cookie,
            },
        },
        function (error, response, body) {
            if (error) {
                logger.log('error', error.message)
                res.json(error);
                return console.dir(error);
            } else {
                res.header("Access-Control-Allow-Origin", config.AllowOriginDomain);
                res.header(
                    "Access-Control-Allow-Methods",
                    "GET,HEAD,PUT,PATCH,POST,DELETE"
                );
                res.header("Access-Control-Expose-Headers", "Content-Length");
                res.header("Access-Control-Allow-Credentials", "true");
                res.header(
                    "Access-Control-Allow-Headers",
                    "Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials"
                );
                if(response.statusCode != 200){
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
                }
                return res.status(response.statusCode).json(body);
            }
        }
    );
};

// nursing emergancy traige get face pain API
exports.getFacePainScaleDetail = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies["MYSAPSSO2"]);
    let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
    const { dockey } = req.query;
    const urlEndpoint = baseURL + config.apiZNSCALESSRV + `/FaceScaleSet(Dockey='${dockey}')?$format=json`;
    var j = request.jar();
    var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
    request(
        {
            method: "GET",
        uri:`${urlEndpoint}`,
            json: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "sap-client": config.client,
                Cookie: mySAPSSO2Cookie,

                //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
            },
        },
        function (error, response, body) {
            if (error) {
                logger.log('error', error.message)
                res.json(error);
                return console.dir(error);
            } else {
                res.header("Access-Control-Allow-Origin", config.AllowOriginDomain);
                res.header(
                    "Access-Control-Allow-Methods",
                    "GET,HEAD,PUT,PATCH,POST,DELETE"
                );
                res.header("Access-Control-Expose-Headers", "Content-Length");
                res.header("Access-Control-Allow-Credentials", "true");
                res.header(
                    "Access-Control-Allow-Headers",
                    "Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials"
                );
                if(response.statusCode != 200){
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
                }
                return res.status(response.statusCode).json(body);
            }
        }
    );
};

// nursing emergancy traige get Glowgos API
exports.getGlowgosScaleDetail = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies["MYSAPSSO2"]);
    let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
    const { dockey } = req.query;
    const urlEndpoint = baseURL + config.apiZNSCALESSRV + `/GlasgowScaleSet(Dockey='${dockey}')?$format=json`;
    var j = request.jar();
    var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
    request(
        {
            method: "GET",
        uri:`${urlEndpoint}`,
            json: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "sap-client": config.client,
                Cookie: mySAPSSO2Cookie,

                //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
            },
        },
        function (error, response, body) {
            if (error) {
                logger.log('error', error.message)
                res.json(error);
                return console.dir(error);
            } else {
                res.header("Access-Control-Allow-Origin", config.AllowOriginDomain);
                res.header(
                    "Access-Control-Allow-Methods",
                    "GET,HEAD,PUT,PATCH,POST,DELETE"
                );
                res.header("Access-Control-Expose-Headers", "Content-Length");
                res.header("Access-Control-Allow-Credentials", "true");
                res.header(
                    "Access-Control-Allow-Headers",
                    "Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials"
                );
                if(response.statusCode != 200){
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
                }
                return res.status(response.statusCode).json(body);
            }
        }
    );
};

// nursing emergancy traige get face pain API
exports.getNumericScaleDetail = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies["MYSAPSSO2"]);
    let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
    const { dockey } = req.query;
    const urlEndpoint = baseURL + config.apiZNSCALESSRV + `/NRSScaleSet(Dockey='${dockey}')?$format=json`;
    var j = request.jar();
    var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
   
    request(
        {
            method: "GET",
        uri:`${urlEndpoint}`,
            json: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "sap-client": config.client,
                Cookie: mySAPSSO2Cookie,

                //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
            },
        },
        function (error, response, body) {
            if (error) {
                logger.log('error', error.message)
                res.json(error);
                return console.dir(error);
            } else {
                res.header("Access-Control-Allow-Origin", config.AllowOriginDomain);
                res.header(
                    "Access-Control-Allow-Methods",
                    "GET,HEAD,PUT,PATCH,POST,DELETE"
                );
                res.header("Access-Control-Expose-Headers", "Content-Length");
                res.header("Access-Control-Allow-Credentials", "true");
                res.header(
                    "Access-Control-Allow-Headers",
                    "Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials"
                );
                if(response.statusCode != 200){
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
                }
                return res.status(response.statusCode).json(body);
            }
        }
    );
};


exports.getFeeServiceSearchSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    const urlEndpoint = baseURL + config.apiZNISHMEDEORDERSRV + `/FeeServiceSearchSet?$filter=(Einri eq '${req.body.Einri}' and Falnr eq '${req.body.Falnr}' and Searchstring eq '${req.body.Searchstring}' and Nursing eq true )`;
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

// nursing emergancy traige glowgos  API
exports.saveNurEmrTriage = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies["MYSAPSSO2"]);
    let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNERNURSINGSRV}/ErNursingSet`

    request(
        {
            method: "POST",
        uri:`${urlEndpoint}`,
            body: req.body,
            json: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "sap-client": config.client,
                Cookie: mySAPSSO2Cookie,
            },
        },
        function (error, response, body) {
            if (error) {
                logger.log('error', error.message)
                res.json(error);
                return console.dir(error);
            } else {
                res.header("Access-Control-Allow-Origin", config.AllowOriginDomain);
                res.header(
                    "Access-Control-Allow-Methods",
                    "GET,HEAD,PUT,PATCH,POST,DELETE"
                );
                res.header("Access-Control-Expose-Headers", "Content-Length");
                res.header("Access-Control-Allow-Credentials", "true");
                res.header(
                    "Access-Control-Allow-Headers",
                    "Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials"
                );
                if(response.statusCode != 200){
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
                }
                return res.status(response.statusCode).json(body);
            }
        }
    );
};

exports.getRoomDetails = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    const { treatmentou } = req.query
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRMDSRV}/RoomListSet?$filter=( Treatmentou eq '${treatmentou}')&$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getEmployeeId = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    const { empid } = req.query
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRMDSRV}/EmployeeListSet?$filter=(Empid eq '${empid}' )`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.saveAssignedRoom = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRNURSESRV}/RoomSet`
    request({
        method: 'POST',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.getAssignedRoom = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRNURSESRV}/RoomListSet?$filter=(Fdate eq datetime'${req.query.Fdate}' and Tdate eq datetime'${req.query.Tdate}')`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}


exports.getServiceHistorySet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRNURSESRV}/ServiceHistorySet?$filter=( Einri eq '${req.body.Einri}' and Falnr eq '${req.body.Falnr}' )&$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
        body: req.body,
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'sap-client': config.client,
            'Cookie': mySAPSSO2Cookie,
        }
    }, function (error, response, body) {
        if (error) {
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}


exports.getLatestAssesmentResult = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    const urlEndpoint = baseURL + config.apiZNSCALESSRV + `/LatestDocSet?$filter=( Einri eq '${req.body.Einri}' and Falnr eq '${req.body.Falnr}' and Patnr eq '${req.body.Patnr}' and Lfdnr eq '${req.body.Lfdnr}')`
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.putGlasgowScaleSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    const urlEndpoint = baseURL + config.apiZNSCALESSRV + `/GlasgowScaleSet(Dockey='${req.body.d.Dockey}')`;
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    
    request({
        method: 'PUT',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.putFaceScaleSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    const urlEndpoint = baseURL + config.apiZNSCALESSRV + `/FaceScaleSet(Dockey='${req.body.d.Dockey}')`;
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    
    request({
        method: 'PUT',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.putNRSScaleSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    const urlEndpoint = baseURL + config.apiZNSCALESSRV + `/NRSScaleSet(Dockey='${req.body.d.Dockey}')`;
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    
    request({
        method: 'PUT',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

// nursing emergancy traige glowgos  API
exports.postBradenScaleSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies["MYSAPSSO2"]);
    let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
    const urlEndpoint = baseURL + config.apiZNSCALESSRV + "/BradenScaleSet"
    request(
        {
            method: "POST",
        uri:`${urlEndpoint}`,
            body: req.body,
            json: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "sap-client": config.client,
                Cookie: mySAPSSO2Cookie,
            },
        },
        function (error, response, body) {
            if (error) {
                logger.log('error', error.message)
                res.json(error);
                return console.dir(error);
            } else {
                res.header("Access-Control-Allow-Origin", config.AllowOriginDomain);
                res.header(
                    "Access-Control-Allow-Methods",
                    "GET,HEAD,PUT,PATCH,POST,DELETE"
                );
                res.header("Access-Control-Expose-Headers", "Content-Length");
                res.header("Access-Control-Allow-Credentials", "true");
                res.header(
                    "Access-Control-Allow-Headers",
                    "Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials"
                );
                if(response.statusCode != 200){
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
                }
                return res.status(response.statusCode).json(body);
            }
        }
    );
};

// nursing emergancy traige get Glowgos API
exports.getBradenScaleDetail = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies["MYSAPSSO2"]);
    let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
    const { dockey } = req.query;
    var j = request.jar();
    var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
    let urlEndpoint = baseURL + config.apiZNSCALESSRV + `/BradenScaleSet(Dockey='${dockey}')?$format=json`;
    
    request(
        {
            method: "GET",
            uri:`${urlEndpoint}`,
            json: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "sap-client": config.client,
                Cookie: mySAPSSO2Cookie,
                //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
            },
        },
        function (error, response, body) {
            if (error) {
                logger.log('error', error.message)
                res.json(error);
                return console.dir(error);
            } else {
                res.header("Access-Control-Allow-Origin", config.AllowOriginDomain);
                res.header(
                    "Access-Control-Allow-Methods",
                    "GET,HEAD,PUT,PATCH,POST,DELETE"
                );
                res.header("Access-Control-Expose-Headers", "Content-Length");
                res.header("Access-Control-Allow-Credentials", "true");
                res.header(
                    "Access-Control-Allow-Headers",
                    "Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials"
                );
                if(response.statusCode != 200){
                    logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
                }
                return res.status(response.statusCode).json(body);
            }
        }
    );
};
exports.putBradenScaleSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    let urlEndpoint = baseURL + config.apiZNSCALESSRV + `/BradenScaleSet(Dockey='${req.body.d.Dockey}')`
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    
    request({
        method: 'PUT',
        uri:`${urlEndpoint}`,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "sap-client": config.client,
            Cookie: mySAPSSO2Cookie,
        },
        //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
    }), function (error, response, body) {
        if (error) {
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    }
}
// When click on traige icon first this API call
exports.getTriageLatestDocumentSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies["MYSAPSSO2"]);
    let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
    let urlEndpoint = String.raw `${baseURL}${config.apiZNERNURSINGSRV}/LatestDocSet?$filter=Einri eq '${req.query.einri}' and Falnr eq '${req.query.falnr}' and Patnr eq '${req.query.patnr}' and Lfdnr eq '${req.query.lfdnr}'&$format=json`;
    var j = request.jar();
    var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
    request(
        {
            method: "GET",
        uri:`${urlEndpoint}`,
            json: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "sap-client": config.client,
                Cookie: mySAPSSO2Cookie,
            },
        },
        function (error, response, body) {
            if (error) {
                logger.log('error', error.message)
                res.json(error);
                return console.dir(error);
            } else {
                res.header("Access-Control-Allow-Origin", config.AllowOriginDomain);
                res.header(
                    "Access-Control-Allow-Methods",
                    "GET,HEAD,PUT,PATCH,POST,DELETE"
                );
                res.header("Access-Control-Expose-Headers", "Content-Length");
                res.header("Access-Control-Allow-Credentials", "true");
                res.header(
                    "Access-Control-Allow-Headers",
                    "Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials"
                );
                if(response.statusCode != 200){
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
                }
                return res.status(response.statusCode).json(body);
            }
        }
    );
};

// When click on traige icon if doc status released open PDF API
exports.getTriagePdfUrl = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies["MYSAPSSO2"]);
    let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
    let urlEndpoint = baseURL + config.apiZNERNURSINGSRV + `/PDFFileSet(Dockey='${req.query.Dockey}')?$format=json`;
    var j = request.jar();
    var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
    request(
        {
            method: "GET",
        uri:`${urlEndpoint}`,
            json: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "sap-client": config.client,
                Cookie: mySAPSSO2Cookie,
            },
        },
        function (error, response, body) {
            if (error) {
                logger.log('error', error.message)
                res.json(error);
                return console.dir(error);
            } else {
                res.header("Access-Control-Allow-Origin", config.AllowOriginDomain);
                res.header(
                    "Access-Control-Allow-Methods",
                    "GET,HEAD,PUT,PATCH,POST,DELETE"
                );
                res.header("Access-Control-Expose-Headers", "Content-Length");
                res.header("Access-Control-Allow-Credentials", "true");
                res.header(
                    "Access-Control-Allow-Headers",
                    "Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials"
                );
                if(response.statusCode != 200){
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
                }
                return res.status(response.statusCode).json(body);
            }
        }
    );
};

// When click on traige icon if doc status draft so get traige model data
exports.getTriageDataStatusDraft = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies["MYSAPSSO2"]);
    let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
    let urlEndpoint = baseURL + config.apiZNERNURSINGSRV + `/ErNursingSet?$filter=Dockey eq '${req.query.Dockey}' &$expand=TOVITALSIGNS,TOALLERGIES,TOPHYEXAM,TOSCALE,TOVACCIN,TOSOCIAL,TOINFECTION&$format=json`;
    var j = request.jar();
    var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
    request(
        {
            method: "GET",
        uri:`${urlEndpoint}`,
            json: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "sap-client": config.client,
                Cookie: mySAPSSO2Cookie,
            },
        },
        function (error, response, body) {
            if (error) {
                logger.log('error', error.message)
                res.json(error);
                return console.dir(error);
            } else {
                res.header("Access-Control-Allow-Origin", config.AllowOriginDomain);
                res.header(
                    "Access-Control-Allow-Methods",
                    "GET,HEAD,PUT,PATCH,POST,DELETE"
                );
                res.header("Access-Control-Expose-Headers", "Content-Length");
                res.header("Access-Control-Allow-Credentials", "true");
                res.header(
                    "Access-Control-Allow-Headers",
                    "Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials"
                );
                if(response.statusCode != 200){
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
                }
                return res.status(response.statusCode).json(body);
            }
        }
    );
};
// GET Social Habits List
exports.getSocialHabitList = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies["MYSAPSSO2"]);
    let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
    let urlEndpoint = baseURL + config.apiZNSOCIALHABITSSRV + `/ImportHabitsSet?$filter=Patnr eq '${req.query.Patnr}'&$format=json`;
    var j = request.jar();
    var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
    request(
        {
            method: "GET",
            uri:`${urlEndpoint}`,
            json: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "sap-client": config.client,
                Cookie: mySAPSSO2Cookie,
            },
        },
        function (error, response, body) {
            if (error) {
                logger.log('error', error.message)
                res.json(error);
                return console.dir(error);
            } else {
                res.header("Access-Control-Allow-Origin", config.AllowOriginDomain);
                res.header(
                    "Access-Control-Allow-Methods",
                    "GET,HEAD,PUT,PATCH,POST,DELETE"
                );
                res.header("Access-Control-Expose-Headers", "Content-Length");
                res.header("Access-Control-Allow-Credentials", "true");
                res.header(
                    "Access-Control-Allow-Headers",
                    "Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials"
                );
                if(response.statusCode != 200){
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
                }
                return res.status(response.statusCode).json(body);
            }
        }
    );
};

// To Calculate Alcohol Consumption
exports.calculateAlcoholConsumption = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies["MYSAPSSO2"]);
    let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
    let urlEndpoint = baseURL + config.apiZNSOCIALHABITSSRV + `/CalcAlcoholConsumptionSet`;

    var j = request.jar();
    var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
    
    request(
        {
            method: "POST",
            uri:`${urlEndpoint}`,
            body: req.body,
            json: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "sap-client": config.client,
                Cookie: mySAPSSO2Cookie,

                //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
            },
        },
        function (error, response, body) {
            if (error) {
                logger.log('error', error.message)
                res.json(error);
                return console.dir(error);
            } else {
                res.header("Access-Control-Allow-Origin", config.AllowOriginDomain);
                res.header(
                    "Access-Control-Allow-Methods",
                    "GET,HEAD,PUT,PATCH,POST,DELETE"
                );
                res.header("Access-Control-Expose-Headers", "Content-Length");
                res.header("Access-Control-Allow-Credentials", "true");
                res.header(
                    "Access-Control-Allow-Headers",
                    "Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials"
                );
                if(response.statusCode != 200){
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
                }
                return res.status(response.statusCode).json(body);
            }
        }
    );
};

// To Post Alcohol Habit
exports.postAlcoholHabitDrinkYes = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies["MYSAPSSO2"]);
    let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
    let urlEndpoint = baseURL + config.apiZNSOCIALHABITSSRV + `/AlcoholHabitSet`;

    var j = request.jar();
    var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
    request(
        {
            method: "POST",
            uri:`${urlEndpoint}`,
            body: req.body,
            json: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "sap-client": config.client,
                Cookie: mySAPSSO2Cookie,

                //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
            },
        },
        function (error, response, body) {
            if (error) {
                logger.log('error', error.message)
                res.json(error);
                return console.dir(error);
            } else {
                res.header("Access-Control-Allow-Origin", config.AllowOriginDomain);
                res.header(
                    "Access-Control-Allow-Methods",
                    "GET,HEAD,PUT,PATCH,POST,DELETE"
                );
                res.header("Access-Control-Expose-Headers", "Content-Length");
                res.header("Access-Control-Allow-Credentials", "true");
                res.header(
                    "Access-Control-Allow-Headers",
                    "Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials"
                );
                if(response.statusCode != 200){
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
                }
                return res.status(response.statusCode).json(body);
            }
        }
    );
};

// To Post Tabacco Habit with Smoke Yes
exports.postTabaccoHabitSmokeYes = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies["MYSAPSSO2"]);
    let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
    let urlEndpoint = baseURL + config.apiZNSOCIALHABITSSRV + `/TabaccoHabitSet`;

    var j = request.jar();
    var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
    request(
        {
            method: "POST",
            uri:`${urlEndpoint}`,
            body: req.body,
            json: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "sap-client": config.client,
                Cookie: mySAPSSO2Cookie,

                //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
            },
        },
        function (error, response, body) {
            if (error) {
                logger.log('error', error.message)
                res.json(error);
                return console.dir(error);
            } else {
                res.header("Access-Control-Allow-Origin", config.AllowOriginDomain);
                res.header(
                    "Access-Control-Allow-Methods",
                    "GET,HEAD,PUT,PATCH,POST,DELETE"
                );
                res.header("Access-Control-Expose-Headers", "Content-Length");
                res.header("Access-Control-Allow-Credentials", "true");
                res.header(
                    "Access-Control-Allow-Headers",
                    "Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials"
                );
                if(response.statusCode != 200){
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
                }
                return res.status(response.statusCode).json(body);
            }
        }
    );
};

// To Post Tabacco Habit with Smoke Yes
exports.postDrugsHabit = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies["MYSAPSSO2"]);
    let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
    let urlEndpoint = baseURL + config.apiZNSOCIALHABITSSRV + `/DrugsHabitsSet`;

    var j = request.jar();
    var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
    request(
        {
            method: "POST",
            uri:`${urlEndpoint}`,
            body: req.body,
            json: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "sap-client": config.client,
                Cookie: mySAPSSO2Cookie,

                //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
            },
        },
        function (error, response, body) {
            if (error) {
                logger.log('error', error.message)
                res.json(error);
                return console.dir(error);
            } else {
                res.header("Access-Control-Allow-Origin", config.AllowOriginDomain);
                res.header(
                    "Access-Control-Allow-Methods",
                    "GET,HEAD,PUT,PATCH,POST,DELETE"
                );
                res.header("Access-Control-Expose-Headers", "Content-Length");
                res.header("Access-Control-Allow-Credentials", "true");
                res.header(
                    "Access-Control-Allow-Headers",
                    "Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials"
                );
                if(response.statusCode != 200){
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
                }
                return res.status(response.statusCode).json(body);
            }
        }
    );
};

// To Post other Habit
exports.postOtherHabit = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies["MYSAPSSO2"]);
    let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
    let urlEndpoint = baseURL + config.apiZNSOCIALHABITSSRV + `/OtherHabitSet`;

    var j = request.jar();
    var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
    
    request(
        {
            method: "POST",
            uri:`${urlEndpoint}`,
            body: req.body,
            json: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "sap-client": config.client,
                Cookie: mySAPSSO2Cookie,

                //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
            },
        },
        function (error, response, body) {
            if (error) {
                logger.log('error', error.message)
                res.json(error);
                return console.dir(error);
            } else {
                res.header("Access-Control-Allow-Origin", config.AllowOriginDomain);
                res.header(
                    "Access-Control-Allow-Methods",
                    "GET,HEAD,PUT,PATCH,POST,DELETE"
                );
                res.header("Access-Control-Expose-Headers", "Content-Length");
                res.header("Access-Control-Allow-Credentials", "true");
                res.header(
                    "Access-Control-Allow-Headers",
                    "Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials"
                );
                if(response.statusCode != 200){
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
                }
                return res.status(response.statusCode).json(body);
            }
        }
    );
};


exports.getMissedDocsSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    let urlEndpoint = baseURL + config.apiZABEMRNURSESRV + `/MissedDocsSet?$filter=(Deptcode eq '${req.query.Deptcode}' and (Date ge datetime'${req.query.Datege}' and Date le datetime'${req.query.Datele}'))&$format=json`;
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.getMissedDocsCount = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    let urlEndpoint = baseURL + config.apiZABEMGYWRKLISTSRV + `/MissedDocsSet/$count`;
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.getNoConsumablesCount = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    let urlEndpoint = baseURL + config.apiZABEMGYWRKLISTSRV + `/NoConsumablesSet/$count`;
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}


exports.getTriagePatientNo = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNERELAPSEDTIMESRV}/PatientCntPerTriageSet?$filter=Date1 eq datetime'${req.query.fromDate}' and Date2 eq datetime'${req.query.toDate}'&$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.getStoragelocationList = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const { searchstring } = req.query;
    const urlEndpoint = baseURL + config.apiZABEMRMDSRV + `/UserStoragelocSet?$filter=Bname eq '${JSON.parse(searchstring).Bname}' and Einri eq '${JSON.parse(searchstring).Einri}' and Falnr eq '${JSON.parse(searchstring).Falnr}' &$format=json`;
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}


exports.getSentCartRecesive = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNCARTRECEIVESRV}/CartSet?$filter=Einri eq '1000' and Nursingou eq '${req.query.Nursingou}' and FromDt eq datetime'${req.query.FromDt}' and FromTm eq time'${req.query.FromTm}' and ToDt eq datetime'${req.query.ToDt}' and ToTm eq time'${req.query.ToTm}' &$expand=TOCONTENT&$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.addReceiveCart = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNCARTRECEIVESRV}/CartSet`
    request({
        method: 'POST',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}



exports.getElepsedTime = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNERELAPSEDTIMESRV}/ElapsedTimeSet?$filter=Date1 eq datetime'${req.query.fromDate}' and Date2 eq datetime'${req.query.toDate}'&$expand=TODETAILS&$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.postOfNurseEndsorment = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies["MYSAPSSO2"]);
    let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
    let urlEndpoint = baseURL + config.apiZNNURSEENDORSSRV + `/NurseEndorsSet`;

    var j = request.jar();
    var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
    request(
        {
            method: "POST",
            uri:`${urlEndpoint}`,
            body: req.body,
            json: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "sap-client": config.client,
                Cookie: mySAPSSO2Cookie,

                //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
            },
        },
        function (error, response, body) {
            if (error) {
                logger.log('error', error.message)
                res.json(error);
                return console.dir(error);
            } else {
                res.header("Access-Control-Allow-Origin", config.AllowOriginDomain);
                res.header(
                    "Access-Control-Allow-Methods",
                    "GET,HEAD,PUT,PATCH,POST,DELETE"
                );
                res.header("Access-Control-Expose-Headers", "Content-Length");
                res.header("Access-Control-Allow-Credentials", "true");
                res.header(
                    "Access-Control-Allow-Headers",
                    "Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials"
                );
                if(response.statusCode != 200){
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
                }
                return res.status(response.statusCode).json(body);
            }
        }
    );
};

exports.getNurseEndsorment = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNNURSEENDORSSRV}/LatestDocSet?$filter=Einri eq '${req.body.Einri}' and Falnr eq '${req.body.Falnr}' and Patnr eq '${req.body.Patnr}' and Lfdnr eq '${req.body.Lfdnr}'&$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.getNurseEndsormentDetail = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNNURSEENDORSSRV}/NurseEndorsSet?$filter=Dockey eq '${req.query.Dockey}'&$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}


exports.updateNurseEndDetail = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNNURSEENDORSSRV}/NurseEndorsSet(Dockey='${req.body.Dockey}')`
    request({
        method: 'PUT',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.deleteNurseEndDoc = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNNURSEENDORSSRV}/NurseEndorsSet(Dockey='${req.query.Dockey}')`
    request({
        method: 'DELETE',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.dialysisTAget = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRNURSESRV}/DialysisTASet?$filter=( Bwidt ge datetime'${req.query.Bwidtge}' and Bwidt le datetime'${req.query.Bwidtle}')&$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.Dialysisget = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRNURSESRV}/DialysisSet?$filter=(( Bwidt ge datetime'${req.query.Bwidtge}' and Bwidt le datetime'${req.query.Bwidtle}'))&$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}



exports.getSurgicalPassportDoc = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNSURGICALPASSPORTSRV}/LatestDocSet?$filter=Einri eq '${req.body.Einri}' and Falnr eq '${req.body.Falnr}' and Patnr eq '${req.body.Patnr}' and Lfdnr eq '${req.body.Lfdnr}'&$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,

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
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}




exports.DailysisSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNDAILYSISASSESSRV}/DailysisSet`
    request({
        method: 'POST',
        uri:`${urlEndpoint}`,
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
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.postOfSurgicalPassp = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies["MYSAPSSO2"]);
    let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
    let urlEndpoint = baseURL + config.apiZNSURGICALPASSPORTSRV + `/SurgicalPassportSet`;

    var j = request.jar();
    var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
    request(
        {
            method: "POST",
        uri:`${urlEndpoint}`,
            body: req.body,
            json: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "sap-client": config.client,
                Cookie: mySAPSSO2Cookie,

                //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
            },
        },
        function (error, response, body) {
            if (error) {
                res.json(error);
                return console.dir(error);
            } else {
                res.header("Access-Control-Allow-Origin", config.AllowOriginDomain);
                res.header(
                    "Access-Control-Allow-Methods",
                    "GET,HEAD,PUT,PATCH,POST,DELETE"
                );
                res.header("Access-Control-Expose-Headers", "Content-Length");
                res.header("Access-Control-Allow-Credentials", "true");
                res.header(
                    "Access-Control-Allow-Headers",
                    "Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials"
                );
                if(response.statusCode != 200){
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
                }
                return res.status(response.statusCode).json(body);
            }
        }
    );
};
exports.getSurgicalPassPortDetail = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNSURGICALPASSPORTSRV}/SurgicalPassportSet?$filter=Dockey eq '${req.query.Dockey}' &$expand=TOVITALSIGNS,TODIAGNOSES&$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

// patient document pain assessment create API in nur dashboard
exports.savePainAssessment = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    let urlEndpoint = String.raw`${baseURL}` + config.apiZNPAINASSESSRV + "/PainAssesSet";

    request({
        method: 'POST',
        uri: `${urlEndpoint}`,
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
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.getPainAssessment = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    request({
        method: 'GET',
        uri: baseURL + config.apiZNPAINASSESSRV + `/PainAssesSet?$filter=Dockey eq '${req.query.Dockey}' &$expand=TOPAINLOGS,TOFLOWSHEET&$format=json`,

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
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

// Get Latest Document
exports.getPALatestDoc = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    let url = baseURL + config.apiZNPAINASSESSRV + `/LatestDocSet?$filter=Einri eq '${req.body.Einri}' and Falnr eq '${req.body.Falnr}' and Patnr eq '${req.body.Patnr}' and Lfdnr eq '${req.body.Lfdnr}'&$format=json`;
    request({
        method: 'GET',
        uri : url,
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
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

// Pain Assessment PDF
exports.getPABackGroundImage = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    let url = baseURL + config.apiZNPAINASSESSRV + `/BGImgSet(Einri='${req.query.Einri}',Dtid='ZMED_PAIN')?$format=json`;
    request({
        method: 'GET',
        uri : url,
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
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.getPainAssessmentPDF = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    let url = baseURL + config.apiZNPAINASSESSRV + `/PDFFileSet(Dockey='${req.query.Dockey}')?$format=json`;
    // let url = baseURL + config.apiZNPAINASSESSRV + `/LatestDocSet?$filter=Einri eq '1000' and Falnr eq '0000001402' and Patnr eq '0000001101' and Lfdnr eq '00001'&$format=json`
    request({
        method: 'GET',
        uri : url,
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
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.deletePainAssessmentDoc = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    request({
        method: 'DELETE',
        uri: baseURL + config.apiZNPAINASSESSRV + `/PainAssesSet(Dockey='${req.query.Dockey}')`,
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
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.deleteSurgicalPassDoc = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNSURGICALPASSPORTSRV}/SurgicalPassportSet(Dockey='${req.query.Dockey}')`
    request({
        method: 'DELETE',
        uri:`${urlEndpoint}`,
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
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.updateSurgicalPassPortDetail = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNSURGICALPASSPORTSRV}/NurseEndorsSet(Dockey='${req.body.d.Dockey}')`
    request({
        method: 'PUT',
        uri:`${urlEndpoint}`,
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
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
exports.LatestDocSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNDAILYSISASSESSRV}/LatestDocSet?$filter=Einri eq '${req.query.Einri}' and Falnr eq '${req.query.Falnr}' and Patnr eq '${req.query.Patnr}' and Lfdnr eq '${req.query.Lfdnr}'&$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.getDailysisSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNDAILYSISASSESSRV}/DailysisSet?$filter=Dockey eq '${req.query.Dockey}'&$expand=TOMONITOR&$format=json`
    request({
        method: 'GET',
        uri: `${urlEndpoint}`,
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
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.deleteDailysisSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = baseURL + config.apiZNDAILYSISASSESSRV + `/DailysisSet(Dockey='${req.query.Dockey}')`;
    request({
        method: 'DELETE',
        uri: baseURL + config.apiZNDAILYSISASSESSRV + `/DailysisSet(Dockey='${req.query.Dockey}')`,
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
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.releaseDialysisDoc = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNDAILYSISASSESSRV}/DailysisSet`
    request({
        method: 'POST',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.getDialysisPDF = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);

    const urlEndpoint = String.raw`${baseURL}${config.apiZNDAILYSISASSESSRV}/PDFFileSet(Dockey='${req.body.Dockey}')`
    request({
        method: 'GET',
        uri: `${urlEndpoint}`,
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
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.LatestMorsefall = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNMORSEFALLSCALESRV}/LatestDocSet?$filter=Einri eq '${req.query.Einri}' and Falnr eq '${req.query.Falnr}' and Patnr eq '${req.query.Patnr}'&$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.CreateMorsefall = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNMORSEFALLSCALESRV}/MFSSet`
    request({
        method: 'POST',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.getMorsefall = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNMORSEFALLSCALESRV}/MFSSet(Dockey='${req.query.Dockey}')?$format=json`
    request({
        method: 'GET',
        uri: `${urlEndpoint}`,
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
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.CreateNewMFSSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNMORSEFALLSCALESRV}/MFSSet(Dockey='${req.query.Dockey}')`
    request({
        method: 'PUT',
        uri:`${urlEndpoint}`,
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
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.getLatestHemoCatheterDoc = (req,res)=>{
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNHEMOCATHETERSRV}/LatestDocSet?$filter=Einri eq '${req.query.Einri}' and Falnr eq '${req.query.Falnr}' and Patnr eq '${req.query.Patnr}' and Lfdnr eq '${req.query.Lfdnr}'&$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
                }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.postHemoCatheterSet = (req,res)=>{
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNHEMOCATHETERSRV}/HemoCatheterSet`
    request({
        method: 'POST',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}


exports.ReleaseHemoCatheterSet = (req,res)=>{
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNHEMOCATHETERSRV}/HemoCatheterSet`
    request({
        method: 'POST',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.getHemoCatheterDocData = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNHEMOCATHETERSRV}/HemoCatheterSet?$filter=Dockey eq '${req.query.Dockey}'&$format=json`
    request({
        method: 'GET',
        uri: `${urlEndpoint}`,
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
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
                }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.postOfPrdiatricWarningScale = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies["MYSAPSSO2"]);
    let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
    let urlEndpoint = baseURL + config.apiZNSCALESSRV + `/PEWSSet`;
    var j = request.jar();
    var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
    request(
        {
            method: "POST",
        uri:`${urlEndpoint}`,
            body: req.body,
            json: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "sap-client": config.client,
                Cookie: mySAPSSO2Cookie,

                //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
            },
        },
        function (error, response, body) {
            if (error) {
                res.json(error);
                return console.dir(error);
            } else {
                res.header("Access-Control-Allow-Origin", config.AllowOriginDomain);
                res.header(
                    "Access-Control-Allow-Methods",
                    "GET,HEAD,PUT,PATCH,POST,DELETE"
                );
                res.header("Access-Control-Expose-Headers", "Content-Length");
                res.header("Access-Control-Allow-Credentials", "true");
                res.header(
                    "Access-Control-Allow-Headers",
                    "Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials"
                );
                if(response.statusCode != 200){
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
                }
                return res.status(response.statusCode).json(body);
            }
        }
    );
};


exports.getPediatricEarlyWarningScore = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNSCALESSRV}/PEWSSet(Dockey='${req.query.Dockey}')?$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
                }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.copyPediatricWarningScore = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    
    const urlEndpoint = String.raw`${baseURL}${config.apiZNSCALESSRV}/PEWSSet(Dockey='${req.body.d.Dockey}')`
    request({
        method: 'PUT',
        uri:`${urlEndpoint}`,
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
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.fistulaGraftSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    let urlEndpoint = String.raw`${baseURL}` + config.apiFISTULAGRAFTSRV + "/FistulaGraftSet";

    request({
        method: 'POST',
        uri: `${urlEndpoint}`,
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
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.getfistulaGraftSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiFISTULAGRAFTSRV}/FistulaGraftSet?$filter=Dockey eq '${req.query.Dockey}'&$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
                }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.LatestFistulaGraftSet = (req,res)=>{
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    console.log(req.query);
    const urlEndpoint = String.raw`${baseURL}${config.apiFISTULAGRAFTSRV}/LatestDocSet?$filter=Einri eq '${req.query.Einri}' and Falnr eq '${req.query.Falnr}' and Patnr eq '${req.query.Patnr}' and Lfdnr eq '${req.query.Lfdnr}'&$format=json`
    console.log(urlEndpoint);
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
                }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.getFistulaGraftDocPDF = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiFISTULAGRAFTSRV}/PDFFileSet(Dockey='${req.query.Dockey}')?$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
                }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.deleteFistulaGraftSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = baseURL + config.apiFISTULAGRAFTSRV + `/FistulaGraftSet(Dockey='${req.query.Dockey}')`;
    request({
        method: 'DELETE',
        uri: `${urlEndpoint}`,
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
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.DialysisMedicationAdministrationSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRNURSESRV}/NotAdminMEEventsSet?$filter=(Deptcode eq '${req.query.Deptcode}' and (Bwidt ge datetime'${req.query.fromDate}' and Bwidt le datetime'${req.query.toDate}'))&$format=json`
    request({
        method: 'GET',
        uri:`${urlEndpoint}`,
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
            logger.log('error', error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}
