const request = require('request');
const config = require('../../config/env.config');
const logger = require('../../utils/logger');

const baseURL = `${config.apiEndpoint}:${config.apiEndpointPort}${config.apiSAPCatlogEndpoint}`;

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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body.error}\nURL Endpoint: ${urlEndpoint}\nFile Name:day-case-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.getPlannedDepartures = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRDAYCARESRV}/PlannedDeparturesSet?$filter=(Einri eq '1000' and Bwidt eq datetime'${req.body.fromDate}')&$format=json`
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body.error}\nURL Endpoint: ${urlEndpoint}\nFile Name:day-case-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.getActualDepartures = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRDAYCARESRV}/ActualDeparturesSet?$filter=(Bwidt ge datetime'${req.body.fromDate}' and Bwidt le datetime'${req.body.toDate}')&$format=json`
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body.error}\nURL Endpoint: ${urlEndpoint}\nFile Name:day-case-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.getFinancialClearance = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRDAYCARESRV}/FinancialClearanceSet?$filter=(Einri eq '1000' and Bwidt eq datetime'${req.body.fromDate}')&$format=json`
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body.error}\nURL Endpoint: ${urlEndpoint}\nFile Name:day-case-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.getPatientAdministration = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRDAYCARESRV}/PatientAdministrationSet?$filter=(( Bwidt ge datetime'${req.query.fromDate}' and Bwidt le datetime'${req.query.toDate}'))&$format=json`
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body.error}\nURL Endpoint: ${urlEndpoint}\nFile Name:day-case-dashboard.js`);
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