const request = require('request');
const express = require("express");
const router = express.Router();
const config = require('../../config/env.config');
const { response } = require('express');
const url = require('url');
const querystring = require('querystring');
const cookieLocal = require('cookie');
const logger = require('../../utils/logger');
router.use((req, res, next) => {
    console.log("Patient Data Middleware Time: ", Date.now());
    next();
});

exports.CASESET = (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);//req.header('MYSAPSSO2');
    //console.log(mysapSSO2Value);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);                                                                               
    j.setCookie(cookie, 'http://achemr01.ach.jo', { domain: 'ach.jo' });

    const urlEndpoint= config.apiEndpointIntegrationPatCase + decodeURI(req.url)
    const options = {
        url:urlEndpoint,
        headers: {
            'User-Agent': 'request',
            'spnego': 'disabled',
            'Accept': 'application/json',
            'Content-Type':'application/json',
            'Cookie':mySAPSSO2Cookie,
            //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
            'sap-client': config.client
        },
        jar: j
    };
    ////console.log(options);
    //////console.log(options.url);  

    request.get(options, (error, response, body) => {
        ////console.log("Error");
        ////console.log(response);
        ////console.log(body);
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
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-order.controller.js`);
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

exports.PrescriptionSet = (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);//req.header('MYSAPSSO2');
    //console.log(mysapSSO2Value);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);                                                                               
    j.setCookie(cookie, 'http://achemr01.ach.jo', { domain: 'ach.jo' });

    const urlEndpoint= config.apiEndpointIntegrationEPresc + decodeURI(req.url)
    const options = {
        url:urlEndpoint,
        headers: {
            'User-Agent': 'request',
            'spnego': 'disabled',
            'Accept': 'application/json',
            'Content-Type':'application/json',
            'Cookie':mySAPSSO2Cookie,
            //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
            'sap-client': config.client
        },
        jar: j
    };
    ////console.log(options);
    //////console.log(options.url);  

    request.get(options, (error, response, body) => {
        ////console.log("Error");
        ////console.log(response);
        ////console.log(body);
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
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-order.controller.js`);
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

exports.LocalizationSet = (req, res) => {

    //if(req.cookies['MYSAPSSO2'] != null && req.cookies['MYSAPSSO2'] !== undefined){
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);                                                                               
    j.setCookie(cookie, 'http://achemr01.ach.jo', { domain: 'ach.jo' });

    const urlEndpoint= config.apiEndpointIntegrationOrder + decodeURI(req.url)
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
    //////console.log(options);
    request.get(options, (error, response, body) => {
        //////console.log(response);
        if (response.statusCode == '401') {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            return res.status('999').json({ 'error': 'No SSO Token Found' });
        }
        else {
            if (error) {
                 logger.log('error',error.message)
                ////console.log(error);
                ////console.log(response.statusCode);
                res.json(error);
                ////console.log(response.statusCode);
                return console.dir(error);
            }
            else {
                res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
                res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
                res.header('Access-Control-Expose-Headers', 'Content-Length');
                res.header('Access-Control-Allow-Credentials', 'true');
                res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
                if(response.statusCode != 200){
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-order.controller.js`);
                }
                if (response.statusCode == 401) {
                    return res.status(response.statusCode).json(body);
                }
                else {
                    return res.status(response.statusCode).json(JSON.parse(body));
                }
            }
        }

    })
    // }
    // else{
    //     res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
    //     res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    //     res.header('Access-Control-Expose-Headers', 'Content-Length');
    //     res.header('Access-Control-Allow-Credentials', 'true');
    //     res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
    //    return res.status('999').json({'error':'No SSO Token Found'});
    // }
}

exports.OrderSet = (req, res) => {
    //if(req.cookies['MYSAPSSO2'] != null && req.cookies['MYSAPSSO2'] !== undefined){
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);                                                                               
    j.setCookie(cookie, 'http://achemr01.ach.jo', { domain: 'ach.jo' });

    const urlEndpoint= config.apiEndpointIntegrationOrder + decodeURI(req.url) + '?spnego=disabled'
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
    //////console.log(options);
    request.get(options, (error, response, body) => {
        if (response.statusCode == '401') {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            return res.status('999').json({ 'error': 'No SSO Token Found' });
        }
        else {
            if (error) {
                 logger.log('error',error.message)
                ////console.log(error);
                ////console.log(response.statusCode);
                res.json(error);
                ////console.log(response.statusCode);
                return console.dir(error);
            }
            else {
                res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
                res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
                res.header('Access-Control-Expose-Headers', 'Content-Length');
                res.header('Access-Control-Allow-Credentials', 'true');
                res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
                if(response.statusCode != 200){
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-order.controller.js`);
                }
                if (response.statusCode == 401) {
                    return res.status(response.statusCode).json(body);
                }
                else {
                    return res.status(response.statusCode).json(JSON.parse(body));
                }
            }
        }

    })
    //}
    // else{
    //     res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
    //     res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    //     res.header('Access-Control-Expose-Headers', 'Content-Length');
    //     res.header('Access-Control-Allow-Credentials', 'true');
    //     res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
    //    return res.status('999').json({'error':'No SSO Token Found'});
    // }
}

exports.OrderConfigSet = (req, res) => {
    //if(req.cookies['MYSAPSSO2'] != null && req.cookies['MYSAPSSO2'] !== undefined){
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);                                                                               
    j.setCookie(cookie, 'http://achemr01.ach.jo', { domain: 'ach.jo' });

    const urlEndpoint= config.apiEndpointIntegrationOrder + decodeURI(req.url)
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
    //////console.log(options);
    request.get(options, (error, response, body) => {
        if (response.statusCode == '401') {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            return res.status('999').json({ 'error': 'No SSO Token Found' });
        }
        else {
            if (error) {
                 logger.log('error',error.message)
                ////console.log(error);
                ////console.log(response.statusCode);
                res.json(error);
                ////console.log(response.statusCode);
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
        }

    })
    //}
    // else{
    //     res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
    //     res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    //     res.header('Access-Control-Expose-Headers', 'Content-Length');
    //     res.header('Access-Control-Allow-Credentials', 'true');
    //     res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
    //    return res.status('999').json({'error':'No SSO Token Found'});
    // }
}

exports.SearchSet = (req, res) => {
    //if(req.cookies['MYSAPSSO2'] != null && req.cookies['MYSAPSSO2'] !== undefined){
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);                                                                               
    j.setCookie(cookie, 'http://achemr01.ach.jo', { domain: 'ach.jo' });

    const urlEndpoint= config.apiEndpointIntegrationOrder + decodeURI(req.url) + '?spnego=disabled'
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
    //////console.log(options);
    request.get(options, (error, response, body) => {
        if (response.statusCode == '401') {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            return res.status('999').json({ 'error': 'No SSO Token Found' });
        }
        else {
            if (error) {
                 logger.log('error',error.message)
                ////console.log(error);
                ////console.log(response.statusCode);
                res.json(error);
                ////console.log(response.statusCode);
                return console.dir(error);
            }
            else {
                res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
                res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
                res.header('Access-Control-Expose-Headers', 'Content-Length');
                res.header('Access-Control-Allow-Credentials', 'true');
                res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
                if(response.statusCode != 200){
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-order.controller.js`);
                }
                if (response.statusCode == 401) {

                    return res.status(response.statusCode).json(body);
                }
                else {
                    return res.status(response.statusCode).json(JSON.parse(body));
                }
            }
        }

    })
    // }
    // else{
    //     res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
    //     res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    //     res.header('Access-Control-Expose-Headers', 'Content-Length');
    //     res.header('Access-Control-Allow-Credentials', 'true');
    //     res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
    //    return res.status('999').json({'error':'No SSO Token Found'});
    // }
}

exports.FeesOrderSet = (req, res) => {
    //if(req.cookies['MYSAPSSO2'] != null && req.cookies['MYSAPSSO2'] !== undefined){
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);                                                                               
    j.setCookie(cookie, 'http://achemr01.ach.jo', { domain: 'ach.jo' });

    const urlEndpoint= config.apiEndpointIntegrationOrder + decodeURI(req.url)
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
    //////console.log(options);
    request.get(options, (error, response, body) => {
        if (response.statusCode == '401') {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            return res.status('999').json({ 'error': 'No SSO Token Found' });
        }
        else {
            if (error) {
                 logger.log('error',error.message)
                ////console.log(error);
                ////console.log(response.statusCode);
                res.json(error);
                ////console.log(response.statusCode);
                return console.dir(error);
            }
            else {
                res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
                res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
                res.header('Access-Control-Expose-Headers', 'Content-Length');
                res.header('Access-Control-Allow-Credentials', 'true');
                res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
                if(response.statusCode != 200){
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-order.controller.js`);
                }
                if (response.statusCode == 401) {
                    return res.status(response.statusCode).json(body);
                }
                else {
                    return res.status(response.statusCode).json(JSON.parse(body));
                }
            }
        }

    })
    // }
    // else{
    //     res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
    //     res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    //     res.header('Access-Control-Expose-Headers', 'Content-Length');
    //     res.header('Access-Control-Allow-Credentials', 'true');
    //     res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
    //    return res.status('999').json({'error':'No SSO Token Found'});
    // }
}

exports.FeesFavouriteSet = (req, res) => {
    //if(req.cookies['MYSAPSSO2'] != null && req.cookies['MYSAPSSO2'] !== undefined){
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);                                                                               
    j.setCookie(cookie, 'http://achemr01.ach.jo', { domain: 'ach.jo' });

    const urlEndpoint= config.apiEndpointIntegrationOrder + decodeURI(req.url)
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
    //////console.log(options);
    request.get(options, (error, response, body) => {
        if (response.statusCode == '401') {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            return res.status('999').json({ 'error': 'No SSO Token Found' });
        }
        else {
            if (error) {
                 logger.log('error',error.message)
                ////console.log(error);
                ////console.log(response.statusCode);
                res.json(error);
                ////console.log(response.statusCode);
                return console.dir(error);
            }
            else {
                res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
                res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
                res.header('Access-Control-Expose-Headers', 'Content-Length');
                res.header('Access-Control-Allow-Credentials', 'true');
                res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
                if(response.statusCode != 200){
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-order.controller.js`);
                }
                if (response.statusCode == 401) {
                    return res.status(response.statusCode).json(body);
                }
                else {
                    return res.status(response.statusCode).json(JSON.parse(body));
                }
            }
        }

    })
    // }
    // else{
    //     res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
    //     res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    //     res.header('Access-Control-Expose-Headers', 'Content-Length');
    //     res.header('Access-Control-Allow-Credentials', 'true');
    //     res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
    //    return res.status('999').json({'error':'No SSO Token Found'});
    // }
}

exports.SearchMSet = (req, res) => {
    //if(req.cookies['MYSAPSSO2'] != null && req.cookies['MYSAPSSO2'] !== undefined){
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);                                                                               
    j.setCookie(cookie, 'http://achemr01.ach.jo', { domain: 'ach.jo' });
    var url = config.apiEndpointIntegrationOrder + decodeURI(req.url) + '?spnego=disabled';
    const urlEndpoint= config.apiEndpointIntegrationOrder + decodeURI(req.url)
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
    //////console.log(options);
    request.get(options, (error, response, body) => {
        if (response.statusCode == '401') {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            return res.status('999').json({ 'error': 'No SSO Token Found' });
        }
        else {
            if (error) {
                 logger.log('error',error.message)
                ////console.log(error);
                ////console.log(response.statusCode);
                res.json(error);
                ////console.log(response.statusCode);
                return console.dir(error);
            }
            else {
                res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
                res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
                res.header('Access-Control-Expose-Headers', 'Content-Length');
                res.header('Access-Control-Allow-Credentials', 'true');
                res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
                if(response.statusCode != 200){
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-order.controller.js`);
                }
                if (response.statusCode == 401) {
                    return res.status(response.statusCode).json(body);
                }
                else {
                    return res.status(response.statusCode).json(JSON.parse(body));
                }
            }
        }

    })
    // }
    // else{
    //     res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
    //     res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    //     res.header('Access-Control-Expose-Headers', 'Content-Length');
    //     res.header('Access-Control-Allow-Credentials', 'true');
    //     res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
    //    return res.status('999').json({'error':'No SSO Token Found'});
    // }
}

exports.FeeServiceSearchSet = (req, res) => {
    //if(req.cookies['MYSAPSSO2'] != null && req.cookies['MYSAPSSO2'] !== undefined){
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);                                                                               
    j.setCookie(cookie, 'http://achemr01.ach.jo', { domain: 'ach.jo' });
    let urlEndpoint = config.apiEndpointIntegrationOrder + decodeURI(req.url);
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
    //////console.log(options);
    request.get(options, (error, response, body) => {
        if (response.statusCode == '401') {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            return res.status('999').json({ 'error': 'No SSO Token Found' });
        }
        else {
            if (error) {
                 logger.log('error',error.message)
                ////console.log(error);
                ////console.log(response.statusCode);
                res.json(error);
                ////console.log(response.statusCode);
                return console.dir(error);
            }
            else {
                res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
                res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
                res.header('Access-Control-Expose-Headers', 'Content-Length');
                res.header('Access-Control-Allow-Credentials', 'true');
                res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
                if(response.statusCode != 200){
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-order.controller.js`);
                }
                if (response.statusCode == 401) {
                    return res.status(response.statusCode).json(body);
                }
                else {
                    return res.status(response.statusCode).json(JSON.parse(body));
                }
            }
        }

    })
    // }
    // else{
    //     res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
    //     res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    //     res.header('Access-Control-Expose-Headers', 'Content-Length');
    //     res.header('Access-Control-Allow-Credentials', 'true');
    //     res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
    //    return res.status('999').json({'error':'No SSO Token Found'});
    // }
}

exports.ClinServiceSet = (req, res) => {
    //if(req.cookies['MYSAPSSO2'] != null && req.cookies['MYSAPSSO2'] !== undefined){
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);                                                                               
    j.setCookie(cookie, 'http://achemr01.ach.jo', { domain: 'ach.jo' });

    const urlEndpoint= config.apiEndpointIntegrationOrder + decodeURI(req.url) + '?spnego=disabled'
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
    //////console.log(options);
    request.get(options, (error, response, body) => {
        if (response.statusCode == '401') {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            return res.status('999').json({ 'error': 'No SSO Token Found' });
        }
        else {
            if (error) {
                 logger.log('error',error.message)
                ////console.log(error);
                ////console.log(response.statusCode);
                res.json(error);
                ////console.log(response.statusCode);
                return console.dir(error);
            }
            else {
                res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
                res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
                res.header('Access-Control-Expose-Headers', 'Content-Length');
                res.header('Access-Control-Allow-Credentials', 'true');
                res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
                if(response.statusCode != 200){
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-order.controller.js`);
                }
                if (response.statusCode == 401) {
                    return res.status(response.statusCode).json(body);
                }
                else {
                    return res.status(response.statusCode).json(JSON.parse(body));
                }
            }
        }

    })
    // }
    // else{
    //     res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
    //     res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    //     res.header('Access-Control-Expose-Headers', 'Content-Length');
    //     res.header('Access-Control-Allow-Credentials', 'true');
    //     res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
    //    return res.status('999').json({'error':'No SSO Token Found'});
    // }
}

exports.FrequencySet = (req, res) => {
    //if(req.cookies['MYSAPSSO2'] != null && req.cookies['MYSAPSSO2'] !== undefined){
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);                                                                               
    j.setCookie(cookie, 'http://achemr01.ach.jo', { domain: 'ach.jo' });

    const urlEndpoint= config.apiEndpointIntegrationEPresc + decodeURI(req.url) + '?spnego=disabled'
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
    //////console.log(options);
    request.get(options, (error, response, body) => {
        if (response?.statusCode == '401') {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            return res.status('999').json({ 'error': 'No SSO Token Found' });
        }
        else {
            if (error) {
                 logger.log('error',error.message)
                ////console.log(error);
                ////console.log(response.statusCode);
                res.json(error);
                ////console.log(response.statusCode);
                return console.dir(error);
            }
            else {
                res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
                res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
                res.header('Access-Control-Expose-Headers', 'Content-Length');
                res.header('Access-Control-Allow-Credentials', 'true');
                res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
                if(response.statusCode != 200){
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-order.controller.js`);
                }
                if (response.statusCode == 401) {
                    return res.status(response.statusCode).json(body);
                }
                else {
                    return res.status(response.statusCode).json(JSON.parse(body));
                }
            }
        }

    })
    // }
    // else{
    //     res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
    //     res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    //     res.header('Access-Control-Expose-Headers', 'Content-Length');
    //     res.header('Access-Control-Allow-Credentials', 'true');
    //     res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
    //    return res.status('999').json({'error':'No SSO Token Found'});
    // }
}

exports.DurationUnitSet = (req, res) => {
    //if(req.cookies['MYSAPSSO2'] != null && req.cookies['MYSAPSSO2'] !== undefined){
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);                                                                               
    j.setCookie(cookie, 'http://achemr01.ach.jo', { domain: 'ach.jo' });

    const urlEndpoint= config.apiEndpointIntegrationEPresc + decodeURI(req.url) + '?spnego=disabled'
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
    //////console.log(options);
    request.get(options, (error, response, body) => {
        if (response.statusCode == '401') {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            return res.status('999').json({ 'error': 'No SSO Token Found' });
        }
        else {
            if (error) {
                 logger.log('error',error.message)
                ////console.log(error);
                ////console.log(response.statusCode);
                res.json(error);
                ////console.log(response.statusCode);
                return console.dir(error);
            }
            else {
                res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
                res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
                res.header('Access-Control-Expose-Headers', 'Content-Length');
                res.header('Access-Control-Allow-Credentials', 'true');
                res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
                if(response.statusCode != 200){
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-order.controller.js`);
                }
                if (response.statusCode == 401) {
                    return res.status(response.statusCode).json(body);
                }
                else {
                    return res.status(response.statusCode).json(JSON.parse(body));
                }
            }
        }

    })
    // }
    // else{
    //     res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
    //     res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    //     res.header('Access-Control-Expose-Headers', 'Content-Length');
    //     res.header('Access-Control-Allow-Credentials', 'true');
    //     res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
    //    return res.status('999').json({'error':'No SSO Token Found'});
    // }
}

exports.DrugPropSet = (req, res) => {
    //if(req.cookies['MYSAPSSO2'] != null && req.cookies['MYSAPSSO2'] !== undefined){
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);                                                                               
    j.setCookie(cookie, 'http://achemr01.ach.jo', { domain: 'ach.jo' });

    const urlEndpoint= config.apiEndpointIntegrationEPresc + decodeURI(req.url) + '?spnego=disabled'
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
    //////console.log(options);
    request.get(options, (error, response, body) => {
        if (response.statusCode == '401') {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            return res.status('999').json({ 'error': 'No SSO Token Found' });
        }
        else {
            if (error) {
                 logger.log('error',error.message)
                ////console.log(error);
                ////console.log(response.statusCode);
                res.json(error);
                ////console.log(response.statusCode);
                return console.dir(error);
            }
            else {
                res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
                res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
                res.header('Access-Control-Expose-Headers', 'Content-Length');
                res.header('Access-Control-Allow-Credentials', 'true');
                res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
                if(response.statusCode != 200){
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-order.controller.js`);
                }
                if (response.statusCode == 401) {
                    return res.status(response.statusCode).json(body);
                }
                else {
                    return res.status(response.statusCode).json(JSON.parse(body));
                }
            }
        }

    })
    // }
    // else{
    //     res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
    //     res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    //     res.header('Access-Control-Expose-Headers', 'Content-Length');
    //     res.header('Access-Control-Allow-Credentials', 'true');
    //     res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
    //    return res.status('999').json({'error':'No SSO Token Found'});
    // }
}


exports.OrderSetPost = (req, res) => {
    ////console.log(req.body);
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);                                                                               

    const urlEndpoint= config.apiEndpointIntegrationOrder + "/OrderSet"
    request({
        method: 'POST',
        body: req.body,
        json: true,
        url:urlEndpoint,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'sap-client': config.client,
            'X-Requested-With': 'XMLHttpRequest',
            'Cookie':mySAPSSO2Cookie,
            //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
        }
    }, function (error, response, body) {
        ////console.log(response);
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

            
            // res.header('Access-Control-Allow-Origin', '*');
            // res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            // res.header('Access-Control-Expose-Headers', 'Content-Length');
            // res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range');
            if(response.statusCode != 200){
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-order.controller.js`);
                }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.PrescriptionSetpost = (req, res) => {
    ////console.log(req.body);
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);                                                                               

    const urlEndpoint= config.apiEndpointIntegrationOrder + "/PrescriptionSet"
    request({
        method: 'POST',
        body: req.body,
        json: true,
        uri:urlEndpoint,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'sap-client': config.client,
            'X-Requested-With': 'XMLHttpRequest',
            'Cookie':mySAPSSO2Cookie,
            //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
        }
    }, function (error, response, body) {
        ////console.log(response);
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

            
            // res.header('Access-Control-Allow-Origin', '*');
            // res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            // res.header('Access-Control-Expose-Headers', 'Content-Length');
            // res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range');
            if(response.statusCode != 200){
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-order.controller.js`);
                }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.ClinFavouriteSet = (req, res) => {
     let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);                                                                               
    const urlEndpoint= config.apiEndpointIntegrationOrder + "/ClinFavouriteSet"
    request({
        method: 'POST',
        body: req.body,
        json: true,
        uri:urlEndpoint,
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
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range');
            if(response.statusCode != 200){
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-order.controller.js`);
                }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.FeesOrderSetPost = (req, res) => {
    ////console.log(req.body);
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);                                                                               

    const urlEndpoint= config.apiEndpointIntegrationOrder + "/FeesOrderSet"
    request({
        method: 'POST',
        body: req.body,
        json: true,
        uri:urlEndpoint,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'sap-client': config.client,
            'X-Requested-With': 'XMLHttpRequest',
            'Cookie':mySAPSSO2Cookie,
            //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
        }
    }, function (error, response, body) {
        ////console.log(response);
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

            
            // res.header('Access-Control-Allow-Origin', '*');
            // res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            // res.header('Access-Control-Expose-Headers', 'Content-Length');
            // res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range');
            if(response.statusCode != 200){
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-order.controller.js`);
                }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.FeesFavouriteSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
   let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

   var j = request.jar();
   var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);                                                                               
   const urlEndpoint= config.apiEndpointIntegrationOrder + "/FeesFavouriteSet"
   request({
       method: 'POST',
       body: req.body,
       json: true,
       uri:urlEndpoint,
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
           res.header('Access-Control-Allow-Origin', '*');
           res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
           res.header('Access-Control-Expose-Headers', 'Content-Length');
           res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range');
           if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-order.controller.js`);
            }
           return res.status(response.statusCode).json(body);
       }
   })
}

exports.FeesFavouriteSetDelete = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);                                                                               
    j.setCookie(cookie, 'http://achemr01.ach.jo', { domain: 'ach.jo' });

    const urlEndpoint= config.apiEndpointIntegrationOrder + decodeURI(req.url)
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
        //jar : j
    };
    request({
        method: 'DELETE',
        json: true,
        uri:urlEndpoint,
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
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range');
            if(response.statusCode != 200){
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-order.controller.js`);
                }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.UserFavSet = (req, res) => {
     let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);                                                                               
    const urlEndpoint= config.apiEndpointIntegrationEPresc + "/UserFavSet"
    request({
        method: 'POST',
        body: req.body,
        json: true,
        uri:urlEndpoint,
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
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range');
            if(response.statusCode != 200){
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-order.controller.js`);
                }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.ClinFavouriteSetDelete = (req, res) => {
    //if(req.cookies['MYSAPSSO2'] != null && req.cookies['MYSAPSSO2'] !== undefined){
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);                                                                               
    j.setCookie(cookie, 'http://achemr01.ach.jo', { domain: 'ach.jo' });

    const urlEndpoint= config.apiEndpointIntegrationOrder + decodeURI(req.url)
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
        //jar : j
    };
    request({
        method: 'DELETE',
        json: true,
        uri:urlEndpoint,
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
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range');
            if(response.statusCode != 200){
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-order.controller.js`);
                }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.UserTemplateSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);                                                                               

    const urlEndpoint= config.apiEndpointIntegrationOrder + decodeURI(req.url)
    request({
        method: 'DELETE',
        body: req.body,
        json: true,
        uri:urlEndpoint,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'sap-client': config.client,
            'X-Requested-With': 'XMLHttpRequest',
            'Cookie':mySAPSSO2Cookie,
            //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
        }
    }, function (error, response, body) {
        ////console.log(response);
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

            
            // res.header('Access-Control-Allow-Origin', '*');
            // res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            // res.header('Access-Control-Expose-Headers', 'Content-Length');
            // res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range');
            if(response.statusCode != 200){
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-order.controller.js`);
                }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.UserTemplateUpdate = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
   let mySAPSSO2Cookie = 'MYSAPSSO2='    + decodeURI(mysapSSO2Value);

   var j = request.jar();
   var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);                                                                               
   const urlEndpoint= config.apiEndpointIntegrationOrder + decodeURI(req.url)
   request({
       method: 'PUT',
       body: req.body,
       json: true,
       uri:urlEndpoint,
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
            logger.log('error',`${response.statusCode + ' ' + body}`)
           }
           return res.status(response.statusCode).json(body);
       }
   })
}

exports.UserFavSetDelete = (req, res) => {
    //if(req.cookies['MYSAPSSO2'] != null && req.cookies['MYSAPSSO2'] !== undefined){
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);                                                                               
    j.setCookie(cookie, 'http://achemr01.ach.jo', { domain: 'ach.jo' });

    const urlEndpoint= config.apiEndpointIntegrationOrder + decodeURI(req.url)
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
        method: 'DELETE',
        json: true,
        uri:urlEndpoint,
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
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range');
            if(response.statusCode != 200){
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-order.controller.js`);
                }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.PATCASEDETSET = (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);//req.header('MYSAPSSO2');
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);                                                                               
    j.setCookie(cookie, 'http://achemr01.ach.jo', { domain: 'ach.jo' });

    const urlEndpoint= config.apiEndpointIntegrationPatCase + decodeURI(req.url)
    const options = {
        url:urlEndpoint,
        headers: {
            'User-Agent': 'request',
            'spnego': 'disabled',
            'Accept': 'application/json',
            'Cookie':mySAPSSO2Cookie,
            //'Authorization': 'Basic cmFrc2hpdGQ6aWRoYUAxMjM=',
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
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-order.controller.js`);
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

exports.OrderConfigSetPost = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
   let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

   var j = request.jar();
   var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);                                                                               
   const urlEndpoint= config.apiEndpointIntegrationOrder + "/OrderConfigSet"
   request({
       method: 'POST',
       body: req.body,
       json: true,
       uri:urlEndpoint,
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
           res.header('Access-Control-Allow-Origin', '*');
           res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
           res.header('Access-Control-Expose-Headers', 'Content-Length');
           res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range');
           if(response.statusCode != 200){
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-order.controller.js`);
            }
           return res.status(response.statusCode).json(body);
       }
   })
}

exports.loginUser = (req, res) => {
    const urlEndpoint= config.apiEndpointIntegrationPatCase + "/$metadata"
    const options = {
        url:urlEndpoint,
        headers: {
            'User-Agent': 'request',
            //'Accept':'application/json',
            //'Content-Type':'application/json',
            'spnego': 'disabled',
            'Authorization': req.headers.authorization,
            'sap-client': config.client
        }
    };
    ////console.log(options.url);
    request.get(options, (error, response, body) => {
        if (error) {
             logger.log('error',error.message)
            res.json(error);
            return console.dir(error);
        }
        else {
            //////console.log(body);
            ////console.log(response.headers);
            var responseCookies = response.headers['set-cookie'];
            ////console.log(responseCookies + "/" + responseCookies.length);
            for (var i = 0; i < responseCookies.length; i++) {
                ////console.log("******" + responseCookies[i]);
                var oneCookie = responseCookies[i];
                //oneCookie = oneCookie.split(';');
                if (oneCookie.indexOf("MYSAPSSO2") != -1) {
                    res.header('Set-Cookie', oneCookie);
                }

            }
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            if(response.statusCode != 200){
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-order.controller.js`);
                }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.OrderPrintSet = (req, res) => {
    //if(req.cookies['MYSAPSSO2'] != null && req.cookies['MYSAPSSO2'] !== undefined){
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);                                                                               
    j.setCookie(cookie, 'http://achemr01.ach.jo', { domain: 'ach.jo' });

    const urlEndpoint= config.apiEndpointIntegrationOrder + decodeURI(req.url)
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
    //////console.log(options);
    request.get(options, (error, response, body) => {
        if (response.statusCode == '401') {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            return res.status('999').json({ 'error': 'No SSO Token Found' });
        }
        else {
            if (error) {
                 logger.log('error',error.message)
                ////console.log(error);
                ////console.log(response.statusCode);
                res.json(error);
                ////console.log(response.statusCode);
                return console.dir(error);
            }
            else {
                res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
                res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
                res.header('Access-Control-Expose-Headers', 'Content-Length');
                res.header('Access-Control-Allow-Credentials', 'true');
                res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
                if(response.statusCode != 200){
                 logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-order.controller.js`);
                }
                if (response.statusCode == 401) {
                    return res.status(response.statusCode).json(body);
                }
                else {
                    return res.status(response.statusCode).json(JSON.parse(body));
                }
            }
        }

    })
    //}
    // else{
    //     res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
    //     res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    //     res.header('Access-Control-Expose-Headers', 'Content-Length');
    //     res.header('Access-Control-Allow-Credentials', 'true');
    //     res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
    //    return res.status('999').json({'error':'No SSO Token Found'});
    // }
}

exports.EmarSet = (req, res) => {
    //if(req.cookies['MYSAPSSO2'] != null && req.cookies['MYSAPSSO2'] !== undefined){
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);                                                                               
    j.setCookie(cookie, 'http://achemr01.ach.jo', { domain: 'ach.jo' });

    const urlEndpoint= config.apiEndpointIntegrationOrder + decodeURI(req.url)
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
    //////console.log(options);
    request.get(options, (error, response, body) => {
        if (response.statusCode == '401') {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            return res.status('999').json({ 'error': 'No SSO Token Found' });
        }
        else {
            if (error) {
                 logger.log('error',error.message)
                ////console.log(error);
                ////console.log(response.statusCode);
                res.json(error);
                ////console.log(response.statusCode);
                return console.dir(error);
            }
            else {
                res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
                res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
                res.header('Access-Control-Expose-Headers', 'Content-Length');
                res.header('Access-Control-Allow-Credentials', 'true');
                res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
                if(response.statusCode != 200){
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-order.controller.js`);
                }
                if (response.statusCode == 401) {
                    return res.status(response.statusCode).json(body);
                }
                else {
                    return res.status(response.statusCode).json(JSON.parse(body));
                }
            }
        }

    })
    //}
    // else{
    //     res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
    //     res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    //     res.header('Access-Control-Expose-Headers', 'Content-Length');
    //     res.header('Access-Control-Allow-Credentials', 'true');
    //     res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
    //    return res.status('999').json({'error':'No SSO Token Found'});
    // }
}

// e-prescription API
exports.EmarSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);                                                                               
    j.setCookie(cookie, 'http://achemr01.ach.jo', { domain: 'ach.jo' });

    const urlEndpoint= config.apiEndpointIntegrationEPrescriptionOrder + decodeURI(req.url)
    const options = {
        url:urlEndpoint,
        headers: {
            'User-Agent': 'request',
            'spnego': 'disabled',
            'Accept': 'application/json',
            'Cookie':mySAPSSO2Cookie,
            'sap-client': config.client,
        },
        jar : j
    };
    request.get(options, (error, response, body) => {
        if (response.statusCode == '401') {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            return res.status('999').json({ 'error': 'No SSO Token Found' });
        }
        else {
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
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-order.controller.js`);
                }
                if (response.statusCode == 401) {
                    return res.status(response.statusCode).json(body);
                }
                else {
                    return res.status(response.statusCode).json(JSON.parse(body));
                }
            }
        }

    })
}

exports.EmarEventSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);                                                                               
    j.setCookie(cookie, 'http://achemr01.ach.jo', { domain: 'ach.jo' });

    const urlEndpoint= config.apiEndpointIntegrationEPrescriptionOrder + decodeURI(req.url)
    const options = {
        url:urlEndpoint,
        headers: {
            'User-Agent': 'request',
            'spnego': 'disabled',
            'Accept': 'application/json',
            'Cookie':mySAPSSO2Cookie,
            'sap-client': config.client,
        },
        jar : j
    };
    request.get(options, (error, response, body) => {
        if (response.statusCode == '401') {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            return res.status('999').json({ 'error': 'No SSO Token Found' });
        }
        else {
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
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-order.controller.js`);
                }
                if (response.statusCode == 401) {
                    return res.status(response.statusCode).json(body);
                }
                else {
                    return res.status(response.statusCode).json(JSON.parse(body));
                }
            }
        }

    })
}

exports.EorderSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);                                                                               
    j.setCookie(cookie, 'http://achemr01.ach.jo', { domain: 'ach.jo' });

    const urlEndpoint= config.apiEndpointIntegrationEPrescriptionOrder + decodeURI(req.url)
    const options = {
        url:urlEndpoint,
        headers: {
            'User-Agent': 'request',
            'spnego': 'disabled',
            'Accept': 'application/json',
            'Cookie':mySAPSSO2Cookie,
            'sap-client': config.client,
        },
        jar : j
    };
    request.get(options, (error, response, body) => {
        if (response.statusCode == '401') {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            return res.status('999').json({ 'error': 'No SSO Token Found' });
        }
        else {
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
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-order.controller.js`);
                }
                if (response.statusCode == 401) {
                    return res.status(response.statusCode).json(body);
                }
                else {
                    return res.status(response.statusCode).json(JSON.parse(body));
                }
            }
        }

    })
}

exports.EorderSetPost = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);                                                                               

    const urlEndpoint= config.apiEndpointIntegrationEPrescriptionOrder + "/EorderSet"
    request({
        method: 'POST',
        body: req.body,
        json: true,
        uri:urlEndpoint,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'sap-client': config.client,
            'X-Requested-With': 'XMLHttpRequest',
            'Cookie':mySAPSSO2Cookie,
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
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-order.controller.js`);
                }
            return res.status(response.statusCode).json(body);
        }
    })
}

exports.PatientMedicationsSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);                                                                               
    j.setCookie(cookie, 'http://achemr01.ach.jo', { domain: 'ach.jo' });

    const urlEndpoint= config.apiEndpointIntegrationEPrescriptionOrder + decodeURI(req.url)
    const options = {
        url:urlEndpoint,
        headers: {
            'User-Agent': 'request',
            'spnego': 'disabled',
            'Accept': 'application/json',
            'Cookie':mySAPSSO2Cookie,
            'sap-client': config.client,
        },
        jar : j
    };
    request.get(options, (error, response, body) => {
        if (response.statusCode == '401') {
            res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
            return res.status('999').json({ 'error': 'No SSO Token Found' });
        }
        else {
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
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-order.controller.js`);
                }
                if (response.statusCode == 401) {
                    return res.status(response.statusCode).json(body);
                }
                else {
                    return res.status(response.statusCode).json(JSON.parse(body));
                }
            }
        }

    })
}

exports.EstdordSetPost = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    const urlEndpoint= config.apiEndpointIntegrationAdministration + "/EstdordSet"
    request({
        method: 'POST',
        body: req.body,
        json: true,
        uri:urlEndpoint,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'sap-client': config.client,
            'X-Requested-With': 'XMLHttpRequest',
            'Cookie':mySAPSSO2Cookie,
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
                  logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:e-order.controller.js`);
                }
            return res.status(response.statusCode).json(body);
        }
    })
}


