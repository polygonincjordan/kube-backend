const request = require('request');
const config = require('../../config/env.config');
const { response } = require('express');
const url = require('url');
const querystring = require('querystring');
const cookieLocal = require('cookie');
const logger = require('../../utils/logger');
exports.EMRWidgetConfigSet = (req,res) =>{
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint);

    const urlEndpoint = config.apiEndpointEMR + decodeURI(req.url)
    const options = {
        url:urlEndpoint,
        headers: {
            'User-Agent': 'request',
            'spnego': 'disabled',
            'Accept': 'application/json',
            'Content-Type':'application/json',
            'Cookie':mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-emr.controller.js`);
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

exports.WidgetInfoSet = (req,res) =>{
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const urlEndpoint = config.apiEndpointEMR + decodeURI(req.url)
    const options = {
        url:urlEndpoint,
        headers: {
            'User-Agent': 'request',
            'spnego': 'disabled',
            'Accept': 'application/json',
            'Content-Type':'application/json',
            'Cookie':mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-emr.controller.js`);
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

exports.WidgetFltFldPropSet = (req,res) =>{
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint);

    const urlEndpoint = config.apiEndpointEMR + decodeURI(req.url)
    const options = {
        url:urlEndpoint,
        headers: {
            'User-Agent': 'request',
            'spnego': 'disabled',
            'Accept': 'application/json',
            'Content-Type':'application/json',
            'Cookie':mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-emr.controller.js`);
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

exports.WidgetFieldVHelpSet = (req,res) =>{
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint);

    const urlEndpoint = config.apiEndpointEMR + decodeURI(req.url)
    const options = {
        url:urlEndpoint,
        headers: {
            'User-Agent': 'request',
            'spnego': 'disabled',
            'Accept': 'application/json',
            'Content-Type':'application/json',
            'Cookie':mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-emr.controller.js`);
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

exports.EMRPATFALAPPSet = (req,res) =>{
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    console.log(mySAPSSO2Cookie);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint );
    console.log(config.apiEndpointEMR + decodeURI(req.url));    
    const urlEndpoint = config.apiEndpointEMR + decodeURI(req.url)
    const options = {
        url:urlEndpoint,
        headers: {
            'User-Agent': 'request',
            'spnego': 'disabled',
            'Accept': 'application/json',
            'Content-Type':'application/json',
            'Cookie':mySAPSSO2Cookie,
            'sap-client': config.client
        },
        jar: j
    };

    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-emr.controller.js`);
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

exports.WidgetDataSet = (req, res) => {
     let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint= config.apiEndpointEMR + "/WidgetDataSet"
    request({
        uri:urlEndpoint,
        method: 'POST',
        body: req.body,
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'sap-client': config.client,
            'Cookie':mySAPSSO2Cookie,
            //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
        }
    }, function (error, response, body) {
        if (error) {
             logger.log('error',error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-emr.controller.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.WidgetActionRespSet = (req, res) => {
     let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint= config.apiEndpointEMR + "/WidgetActionRespSet"
    request({
        uri:urlEndpoint,
        method: 'POST',
        body: req.body,
        json: true,
        headers: {
            'Content-Type': 'application/json',
            //'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'sap-client': config.client,
            'Cookie':mySAPSSO2Cookie,
            //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
        }
    }, function (error, response, body) {
        //console.log(response);
        if (error) {
             logger.log('error',error.message)
            res.json(error);
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length,sap-message');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('sap-message',response.headers['sap-message']);
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range');
            //console.log(body);
            if(response.statusCode != 200){
                logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-emr.controller.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

// Generic GET proxy to the ZNEEMR_SRV OData service for the checked-results
// entity sets (LabPrSetSet / RadPrSet). Rebuilds the SAP URL from the parsed
// query so the $filter is cleanly re-encoded (Node's request lib rejects raw
// spaces), carrying the user's MYSAPSSO2 cookie.
const emrODataGet = (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint);

    const entitySet = req.path.replace(/^\//, '');
    const filter = req.query['$filter'] || '';
    const urlEndpoint = config.apiEndpointEMR + '/' + entitySet
        + '?$filter=' + encodeURIComponent(filter) + '&$format=json'
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
            if (response.statusCode != 200) {
                logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-emr.controller.js`);
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

// Checked Lab results that already have a PR (checked) status.
exports.LabPrSet = (req, res) => emrODataGet(req, res);

// Checked Radiology reports that already have a PR (checked) status.
exports.RadPrSet = (req, res) => emrODataGet(req, res);

exports.EMRWidgetConfigSetPost = (req, res) => {
     let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint= config.apiEndpointEMR + "/EMRWidgetConfigSet"
    request({
        uri:urlEndpoint,
        method: 'POST',
        body: req.body,
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'sap-client': config.client,
            'Cookie':mySAPSSO2Cookie,
            //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
        }
    }, function (error, response, body) {
        if (error) {
             logger.log('error',error.message)
            res.json(error);
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range');
            if(response.statusCode != 200){
               logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-emr.controller.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.EMRWidgetConfigSetDelete = (req, res) => {
    //if(req.cookies['MYSAPSSO2'] != null && req.cookies['MYSAPSSO2'] !== undefined){
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

    const urlEndpoint = config.apiEndpointEMR + decodeURI(req.url)
    const options = {
        url:urlEndpoint,
        headers: {
            'User-Agent': 'request',
            'spnego': 'disabled',
            'Accept': 'application/json',
            'Cookie':mySAPSSO2Cookie,
            //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
            'sap-client': config.client,
        },
        jar : j
    };

    request({
        uri:urlEndpoint,
        method: 'DELETE',
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'sap-client': config.client,
            'Cookie':mySAPSSO2Cookie,
            //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
        }
    }, function (error, response, body) {
        if (error) {
             logger.log('error',error.message)
            res.json(error);
            return console.dir(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range');
            if(response.statusCode != 200){
                logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-emr.controller.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.loginUser = (req, res) => {
    //console.log("***********************");
    //console.log(req.headers.authorization);
       
    const urlEndpoint = config.apiEndpointEMR + "/EMRUserInfoSet?spnego=disabled"
    const options = {
        url:urlEndpoint,
        headers: {
            'User-Agent': 'request',
            'spnego': 'disabled',
            'Authorization': req.headers.authorization,
            'sap-client': config.client,
            'spnego': 'disabled',
            'Accept': 'application/json',
            'Content-Type':'application/json'
        }
    };
    //console.log(options.url);
    console.log(options);
    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message)
            res.json(error);
            return console.dir(error);
        }
        else {
             ////console.log(body);
            //console.log(response.headers);
            var responseCookies = response.headers['set-cookie'];
            //console.log(responseCookies + "/" + responseCookies.length);
            for (var i = 0; i < responseCookies.length; i++) {
                //console.log("******" + responseCookies[i]);
                var oneCookie = responseCookies[i];
                //oneCookie = oneCookie.split(';');
                if (oneCookie.indexOf("MYSAPSSO2") != -1) {
                    if(config.isLocalHost)
                    {
                        oneCookie=oneCookie.replace(".ach.jo",'localhost');
                    }

                    res.header('Set-Cookie', oneCookie);
                }

            }

            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-emr.controller.js`);
            }
           
            
            if (response.statusCode == 401) {

                return res.status(response.statusCode).json(body);
            }
            else {
                return res.status(response.statusCode).json(JSON.parse(body));
            }
        }
    })
}

exports.InPatientList = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
   let mySAPSSO2Cookie = 'MYSAPSSO2='    + decodeURI(mysapSSO2Value);

   var j = request.jar();
   var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
   if (req.body.module === 'home') {
    if (req.body.hasOwnProperty('AdmDateFrom')) {
       var ipSetFilter = `/IPLISTSET?$filter=( (AdmDateFrom eq datetime'${req.body.AdmDateFrom}') and (AdmDateTo eq datetime'${req.body.AdmDateTo}') and (Floor eq '${req.body.Floor}') and (Patientstatus eq '${req.body.Patientstatus}'))`;
    } else {
        var ipSetFilter = `/IPLISTSET?$filter=( (Floor eq '${req.body.Floor}') and (Patientstatus eq '${req.body.Patientstatus}'))`;
    }
   
   }
   if (req.body.module === 'My_IP_consultations') {
    if (req.body.hasOwnProperty('AdmDateFrom')) {
    var ipSetFilter = `/ConsultationSet?$filter=( (AdmDateFrom eq datetime'${req.body.AdmDateFrom}') and (AdmDateTo eq datetime'${req.body.AdmDateTo}') and (Floor eq '${req.body.Floor}') and (Patientstatus eq '${req.body.Patientstatus}'))`;
    }
    else{
        var ipSetFilter = `/ConsultationSet?$filter=( (Floor eq '${req.body.Floor}') and (Patientstatus eq '${req.body.Patientstatus}'))`;
    }
   }
   if (req.body.module === 'Abnormal_Lab_Results') {
    if (req.body.hasOwnProperty('AdmDateFrom')) {
    var ipSetFilter = `/AbnormalLabSet?$filter=( (AdmDateFrom eq datetime'${req.body.AdmDateFrom}') and (AdmDateTo eq datetime'${req.body.AdmDateTo}') and (Floor eq '${req.body.Floor}') and (Patientstatus eq '${req.body.Patientstatus}'))`;
    }
    else{
        var ipSetFilter = `/AbnormalLabSet?$filter=( (Floor eq '${req.body.Floor}') and (Patientstatus eq '${req.body.Patientstatus}'))`;
    }
   }
   if (req.body.module === 'Abnormal_Rad_Findings') {
    if (req.body.hasOwnProperty('AdmDateFrom')) {
    var ipSetFilter = `/AbnormalRabSet?$filter=( (AdmDateFrom eq datetime'${req.body.AdmDateFrom}') and (AdmDateTo eq datetime'${req.body.AdmDateTo}') and (Floor eq '${req.body.Floor}') and (Patientstatus eq '${req.body.Patientstatus}'))`;
    }else{
        var ipSetFilter = `/AbnormalRabSet?$filter=( (Floor eq '${req.body.Floor}') and (Patientstatus eq '${req.body.Patientstatus}'))`;
    }
   }
   if (req.body.module === 'Missed_Medications_Doses') {
    var ipSetFilter = `/MissedMedicationSet?$filter=((Floor eq '${req.body.Floor}') and (Patientstatus eq '${req.body.Patientstatus}'))`;
   }
   if (req.body.module === 'Not_Released_Documents') {
    var ipSetFilter = `/NotReleasedDocSet`;
   }
   if (req.body.module === 'Not_Executed_Physician_Order') {
    var ipSetFilter = `/PhyorderNotExecutedSet?$filter=((Floor eq '${req.body.Floor}') and (Patientstatus eq '${req.body.Patientstatus}'))`;
   }
   const urlEndpoint= config.apiEndpointEMRInPatient + 'ZAB_EMR_IP_LIST_SRV' + ipSetFilter
   console.log(urlEndpoint);
   request({
    uri:urlEndpoint,   
    method: 'GET',
       body: req.body,
       json: true,
       headers: {
           'Content-Type': 'application/json',
           'Accept': 'application/json',
           'X-Requested-With': 'XMLHttpRequest',
           'sap-client': config.client,
           'Cookie':mySAPSSO2Cookie,
          
           //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
       }
   }, function (error, response, body) {
       if (error) {
         logger.log('error',error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-emr.controller.js`);
            }
           var ipBody = {
            module:req.body.module,
            result:body
           }
           return res.status(response.statusCode).json(ipBody);
       }
   })
}

exports.getWardList = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
   let mySAPSSO2Cookie = 'MYSAPSSO2='    + decodeURI(mysapSSO2Value);

   var j = request.jar();
   var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
   const urlEndpoint= config.apiEndpointEMRInPatient + 'ZAB_EMR_IP_LIST_SRV' + '/WardListSet'
   request({
    uri:urlEndpoint,   
    method: 'GET',
       body: req.body,
       json: true,
       headers: {
           'Content-Type': 'application/json',
           'Accept': 'application/json',
           'X-Requested-With': 'XMLHttpRequest',
           'sap-client': config.client,
           'Cookie':mySAPSSO2Cookie,
          
           //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
       }
   }, function (error, response, body) {
       if (error) {
         logger.log('error',error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-emr.controller.js`);
            }
           return res.status(response.statusCode).json(body);
       }
   })
}

//high dependency
exports.getHighDependencyOfPatientList = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
   let mySAPSSO2Cookie = 'MYSAPSSO2='    + decodeURI(mysapSSO2Value);

   var j = request.jar();
   var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
   const urlEndpoint= config.apiEndpointEMRInPatient +'ZAB_CASE_HDFLAG_SRV'+ `/HighDependencySet?$filter=( (Einri eq '${req.body.Einri}') and (Falnr eq '${req.body.Falnr}') )`
   request({
    uri:urlEndpoint,   
    method: 'GET',
       body: req.body,
       json: true,
       headers: {
           'Content-Type': 'application/json',
           'Accept': 'application/json',
           'X-Requested-With': 'XMLHttpRequest',
           'sap-client': config.client,
           'Cookie':mySAPSSO2Cookie,
          
           //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
       }
   }, function (error, response, body) {
       if (error) {
         logger.log('error',error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-emr.controller.js`);
            }
           return res.status(response.statusCode).json(body);
       }
   })
}

exports.HighDependencyOfPatientList = (req, res) => {
    console.log('req---'+ req.body.Floor);
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
   let mySAPSSO2Cookie = 'MYSAPSSO2='    + decodeURI(mysapSSO2Value);

   var j = request.jar();
   var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
   const urlEndpoint= config.apiEndpointEMRInPatient +'ZAB_CASE_HDFLAG_SRV'+ "/HighDependencySet"
   request({
    uri:urlEndpoint,   
    method: 'POST',
       body: req.body,
       json: true,
       headers: {
           'Content-Type': 'application/json',
           'Accept': 'application/json',
           'X-Requested-With': 'XMLHttpRequest',
           'sap-client': config.client,
           'Cookie':mySAPSSO2Cookie,
          
           //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
       }
   }, function (error, response, body) {
       if (error) {
         logger.log('error',error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-emr.controller.js`);
            }
           return res.status(response.statusCode).json(body);
       }
   })
}

//config tools
exports.getConfigTools = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
   let mySAPSSO2Cookie = 'MYSAPSSO2='    + decodeURI(mysapSSO2Value);

   var j = request.jar();
   var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
   const urlEndpoint= config.apiEndpointEMRInPatient +'ZAB_COMP_CONFIG_SRV'+ `/CompConfigSet?$expand=ConfigHeaderItem&$filter=( (Compid eq '${req.body.Compid}') )`
   request({
    uri:urlEndpoint,   
    method: 'GET',
       body: req.body,
       json: true,
       headers: {
           'Content-Type': 'application/json',
           'Accept': 'application/json',
           'X-Requested-With': 'XMLHttpRequest',
           'sap-client': config.client,
           'Cookie':mySAPSSO2Cookie,
          
           //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
       }
   }, function (error, response, body) {
       if (error) {
         logger.log('error',error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-emr.controller.js`);
            }
           return res.status(response.statusCode).json(body);
       }
   })
}

exports.postConfigTools = (req, res) => {

    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
   let mySAPSSO2Cookie = 'MYSAPSSO2='    + decodeURI(mysapSSO2Value);

   var j = request.jar();
   var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
   const urlEndpoint= config.apiEndpointEMRInPatient +'ZAB_COMP_CONFIG_SRV'+ "/CompConfigSet"
   request({
    uri:urlEndpoint,   
    method: 'POST',
       body: req.body,
       json: true,
       headers: {
           'Content-Type': 'application/json',
           'Accept': 'application/json',
           'X-Requested-With': 'XMLHttpRequest',
           'sap-client': config.client,
           'Cookie':mySAPSSO2Cookie,
          
           //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
       }
   }, function (error, response, body) {
       if (error) {
         logger.log('error',error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-emr.controller.js`);
            }
           return res.status(response.statusCode).json(body);
       }
   })
}

//count
exports.getCountForModules = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
   let mySAPSSO2Cookie = 'MYSAPSSO2='    + decodeURI(mysapSSO2Value);

   var j = request.jar();
   var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
   if (req.body.module === 'home') {
    var ipCount = `/IPLISTSET/$count`;
   }
   if (req.body.module === 'My_IP_consultations') {
    var ipCount =  `/ConsultationSet/$count`;
   }
   if (req.body.module === 'Abnormal_Lab_Results') {
    var ipCount = `/AbnormalLabSet/$count`;
   }
   if (req.body.module === 'Abnormal_Rad_Findings') {
    var ipCount = `/AbnormalRabSet/$count`;
   }
   if (req.body.module === 'Missed_Medications_Doses') {
    var ipCount = `/MissedMedicationSet/$count`;
   }
   if (req.body.module === 'Not_Released_Documents') {
    var ipCount = `/NotReleasedDocSet/$count`;
   }
   if (req.body.module === 'Not_Executed_Physician_Order') {
    var ipCount = `/PhyorderNotExecutedSet/$count`;
   }
   const urlEndpoint= config.apiEndpointEMRInPatient +'ZAB_EMR_IP_LIST_SRV'+ ipCount
   request({
    uri:urlEndpoint,   
    method: 'GET',
       body: req.body,
       json: true,
       headers: {
           'Content-Type': 'application/json',
           'Accept': 'application/json',
           'X-Requested-With': 'XMLHttpRequest',
           'sap-client': config.client,
           'Cookie':mySAPSSO2Cookie,
          
           //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
       }
   }, function (error, response, body) {
       if (error) {
         logger.log('error',error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-emr.controller.js`);
            }
           var newBody = {
            count:body,
            module:req.body.module
           }
           return res.status(response.statusCode).json(newBody);
       }
   })
}

exports.getCountForPhOrderModules = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
   let mySAPSSO2Cookie = 'MYSAPSSO2='    + decodeURI(mysapSSO2Value);

   var j = request.jar();
   var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    
   var ipCount = `/PhyorderNotExecutedSet/$count?$filter=(Deptou eq 'EMEMDAMC' and (Bwidt ge datetime'${req.body.fromDate}' and Bwidt le datetime'${req.body.toDate}'))`;
   let url = config.apiEndpointEMRInPatient +config.apiZABEMRNURSESRVPH + ipCount
   console.log(url,"===");
   const urlEndpoint= config.apiEndpointEMRInPatient +config.apiZABEMRNURSESRVPH + ipCount
   request({
    uri:urlEndpoint,   
    method: 'GET',
       body: req.body,
       json: true,
       headers: {
           'Content-Type': 'application/json',
           'Accept': 'application/json',
           'X-Requested-With': 'XMLHttpRequest',
           'sap-client': config.client,
           'Cookie':mySAPSSO2Cookie,
          
           //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
       }
   }, function (error, response, body) {
       if (error) {
         logger.log('error',error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-emr.controller.js`);
            }
           var newBody = {
            count:body,
            module:req.body.module
           }
           return res.status(response.statusCode).json(newBody);
       }
   })
}

// physician order
exports.physicianOrderSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
   let mySAPSSO2Cookie = 'MYSAPSSO2='    + decodeURI(mysapSSO2Value);

   var j = request.jar();
   var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
   const urlEndpoint= config.apiEndpointEMRInPatient +'ZAB_EMR_PHY_ORDER_SRV'+ `/PhyOrderSet('${req.body.PorderId}')`
   request({
    uri:urlEndpoint,   
    method: 'PUT',
       body: req.body,
       json: true,
       headers: {
           'Content-Type': 'application/json',
           'Accept': 'application/json',
           'X-Requested-With': 'XMLHttpRequest',
           'sap-client': config.client,
           'Cookie':mySAPSSO2Cookie,
          
           //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
       }
   }, function (error, response, body) {
       if (error) {
         logger.log('error',error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-emr.controller.js`);
            }
           return res.status(response.statusCode).json(body);
       }
   })
}

exports.CancelReasonSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
   let mySAPSSO2Cookie = 'MYSAPSSO2='    + decodeURI(mysapSSO2Value);

   var j = request.jar();
   var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
   const urlEndpoint= config.apiEndpointEMRInPatient +'ZAB_EMR_PHY_ORDER_SRV'+ `/CancelReasonSet`
   request({
    uri:urlEndpoint,   
    method: 'GET',
       body: req.body,
       json: true,
       headers: {
           'Content-Type': 'application/json',
           'Accept': 'application/json',
           'X-Requested-With': 'XMLHttpRequest',
           'sap-client': config.client,
           'Cookie':mySAPSSO2Cookie,
          
           //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
       }
   }, function (error, response, body) {
       if (error) {
         logger.log('error',error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-emr.controller.js`);
            }
           return res.status(response.statusCode).json(body);
       }
   })
}

exports.createPhysicianOrder = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
   let mySAPSSO2Cookie = 'MYSAPSSO2='    + decodeURI(mysapSSO2Value);

   var j = request.jar();
   var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
   const urlEndpoint= config.apiEndpointEMRInPatient +'ZAB_EMR_PHY_ORDER_SRV'+ `/PhyOrderSet`
   request({
    uri:urlEndpoint,   
    method: 'POST',
       body: req.body,
       json: true,
       headers: {
           'Content-Type': 'application/json',
           'Accept': 'application/json',
           'X-Requested-With': 'XMLHttpRequest',
           'sap-client': config.client,
           'Cookie':mySAPSSO2Cookie,
          
           //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
       }
   }, function (error, response, body) {
       if (error) {
         logger.log('error',error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-emr.controller.js`);
            }
           return res.status(response.statusCode).json(body);
       }
   })
}

exports.createMultiplePhysicianOrder = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
   let mySAPSSO2Cookie = 'MYSAPSSO2='    + decodeURI(mysapSSO2Value);

   var j = request.jar();
   var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
   const urlEndpoint= config.apiEndpointEMRInPatient +'ZAB_EMR_PHY_ORDER_SRV'+ `/PhyOrderMultipleSet`
   request({
    uri:urlEndpoint,   
    method: 'POST',
       body: req.body,
       json: true,
       headers: {
           'Content-Type': 'application/json',
           'Accept': 'application/json',
           'X-Requested-With': 'XMLHttpRequest',
           'sap-client': config.client,
           'Cookie':mySAPSSO2Cookie,
          
           //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
       }
   }, function (error, response, body) {
       if (error) {
         logger.log('error',error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-emr.controller.js`);
            }
           return res.status(response.statusCode).json(body);
       }
   })
}

exports.occupationalGroupList = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
   let mySAPSSO2Cookie = 'MYSAPSSO2='    + decodeURI(mysapSSO2Value);

   var j = request.jar();
   var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
   const urlEndpoint= config.apiEndpointEMRInPatient +'ZAB_EMR_MD_SRV'+ `/OccupationalGroupSet`
   request({
    uri:urlEndpoint,   
    method: 'GET',
       body: req.body,
       json: true,
       headers: {
           'Content-Type': 'application/json',
           'Accept': 'application/json',
           'X-Requested-With': 'XMLHttpRequest',
           'sap-client': config.client,
           'Cookie':mySAPSSO2Cookie,
          
           //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
       }
   }, function (error, response, body) {
       if (error) {
         logger.log('error',error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-emr.controller.js`);
            }
           return res.status(response.statusCode).json(body);
       }
   })
}

exports.createProgressEntry = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
   let mySAPSSO2Cookie = 'MYSAPSSO2='    + decodeURI(mysapSSO2Value);

   var j = request.jar();
   var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
   const urlEndpoint= config.apiEndpointEMRInPatient +'ZAB_EMR_PDC_NOTES_SRV'+ `/ProgressNoteSet`
   request({
    uri:urlEndpoint,   
    method: 'POST',
       body: req.body,
       json: true,
       headers: {
           'Content-Type': 'application/json',
           'Accept': 'application/json',
           'X-Requested-With': 'XMLHttpRequest',
           'sap-client': config.client,
           'Cookie':mySAPSSO2Cookie,
          
           //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
       }
   }, function (error, response, body) {
       if (error) {
         logger.log('error',error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-emr.controller.js`);
            }
           return res.status(response.statusCode).json(body);
       }
   })
}

exports.consultationCompletion = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
   let mySAPSSO2Cookie = 'MYSAPSSO2='    + decodeURI(mysapSSO2Value);

   var j = request.jar();
   var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
   const urlEndpoint= config.apiEndpointEMRInPatient +'ZAB_EMR_CONSULT_ORD_SRV'+ `/ConsultationOrderSet('${req.body.Vkgid}')`
   request({
    uri:urlEndpoint,   
    method: 'PUT',
       body: req.body,
       json: true,
       headers: {
           'Content-Type': 'application/json',
           'Accept': 'application/json',
           'X-Requested-With': 'XMLHttpRequest',
           'sap-client': config.client,
           'Cookie':mySAPSSO2Cookie,
          
           //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
       }
   }, function (error, response, body) {
       if (error) {
         logger.log('error',error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-emr.controller.js`);
            }
           return res.status(response.statusCode).json(body);
       }
   })
}
exports.changeStatus = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
   let mySAPSSO2Cookie = 'MYSAPSSO2='    + decodeURI(mysapSSO2Value);

   var j = request.jar();
   var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
   const urlEndpoint= config.apiEndpointEMRInPatient +'ZN_UPDATE_CASE_STATUS_SRV'+ `/StatusUpdateSet('${req.body.Einri}')`
   request({
    uri:urlEndpoint,   
    method: 'PUT',
       body: req.body,
       json: true,
       headers: {
           'Content-Type': 'application/json',
           'Accept': 'application/json',
           'X-Requested-With': 'XMLHttpRequest',
           'sap-client': config.client,
           'Cookie':mySAPSSO2Cookie,
          
           //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
       }
   }, function (error, response, body) {
       if (error) {
         logger.log('error',error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-emr.controller.js`);
            }
           return res.status(response.statusCode).json(body);
       }
   })
}
exports.physicianOrderText = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
   let mySAPSSO2Cookie = 'MYSAPSSO2='    + decodeURI(mysapSSO2Value);

   var j = request.jar();
   var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
   const urlEndpoint= config.apiEndpointEMRInPatient +'ZAB_EMR_PHY_ORDER_SRV'+ `/PhyOrderTextSet`
   request({
    uri:urlEndpoint,   
    method: 'GET',
       body: req.body,
       json: true,
       headers: {
           'Content-Type': 'application/json',
           'Accept': 'application/json',
           'X-Requested-With': 'XMLHttpRequest',
           'sap-client': config.client,
           'Cookie':mySAPSSO2Cookie,
          
           //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
       }
   }, function (error, response, body) {
       if (error) {
         logger.log('error',error.message)
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-emr.controller.js`);
            }
           return res.status(response.statusCode).json(body);
       }
   })
}