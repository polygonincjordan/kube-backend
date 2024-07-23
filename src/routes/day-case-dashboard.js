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
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRNURSESRV}/NotAdminMEEventsSet?$filter=(Deptcode eq '${req.query.Deptcode}' and (Bwidt ge datetime'${req.query.fromDate}' and Bwidt le datetime'${req.query.toDate}'))&$format=json`;
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
    let Deptcode = ''
    let allFIlter = '';
    if (deptcodefilter || roomfilter || Behpersonfilter || Posstatusfilter || dateFromfilter) {
        allFIlter = `?$filter=(${Deptcode}${deptcodefilter}${roomfilter}${Behpersonfilter}${Posstatusfilter}${dateFromfilter})`;
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

exports.createNursingCarePlan = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies["MYSAPSSO2"]);
    let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNNURSINGCARESRV}/NurseCarePlanSet`;
    request(
      {
        method: "POST",
        uri: `${urlEndpoint}`,
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
          logger.log("error", error.message);
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
          if (response.statusCode != 200) {
            logger.log(
              "error",
              `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`
            );
          }
          return res.status(response.statusCode).json(body);
        }
      }
    );
  };
  
  exports.deleteNursingCarePlan = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies["MYSAPSSO2"]);
    let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNNURSINGCARESRV}/NurseCarePlanSet(Dockey='${req.body.Dockey}')`;
    request(
      {
        method: "DELETE",
        uri: `${urlEndpoint}`,
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
          logger.log("error", error.message);
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
          if (response.statusCode != 200) {
            logger.log(
              "error",
              `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`
            );
          }
          return res.status(response.statusCode).json(body);
        }
      }
    );
  };
  
  exports.nursingCarePlanLatestDoc = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies["MYSAPSSO2"]);
    let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
    const urlEndpoint = `${baseURL}${config.apiZNNURSINGCARESRV}/LatestDocSet?$filter=Einri eq '${req.body.Einri}' and Falnr eq '${req.body.Falnr}' and Patnr eq '${req.body.Patnr}' and Lfdnr eq '${req.body.Lfdnr}'&$format=json`;
    request(
      {
        method: "GET",
        uri: `${urlEndpoint}`,
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
          if (response.statusCode != 200) {
            logger.log(
              "error",
              `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`
            );
          }
          return res.status(response.statusCode).json(body);
        }
      }
    );
  };
  
  exports.getNursingCarePlanDocData = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies["MYSAPSSO2"]);
    let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
    const urlEndpoint = `${baseURL}${config.apiZNNURSINGCARESRV}/NurseCarePlanSet?$filter=Dockey eq '${req.query.Dockey}'&$format=json`;
    request(
      {
        method: "GET",
        uri: `${urlEndpoint}`,
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
          if (response.statusCode != 200) {
            logger.log(
              "error",
              `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`
            );
          }
          return res.status(response.statusCode).json(body);
        }
      }
    );
  };

  // Nursing Discharge Assessment Document
  exports.getNursingDischargeDocData = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies["MYSAPSSO2"]);
    let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
    const urlEndpoint = `${baseURL}${config.apiZNNURSEDISCHSUMSRV}/NurseDischSumSet?$filter=Dockey eq '${req.query.Dockey}' &$expand=TODIAGNOSES&$format=json`;
    request(
      {
        method: "GET",
        uri: `${urlEndpoint}`,
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
          if (response.statusCode != 200) {
            logger.log(
              "error",
              `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`
            );
          }
          return res.status(response.statusCode).json(body);
        }
      }
    );
  };

  exports.nursingDischargeLatestDoc = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies["MYSAPSSO2"]);
    let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
    const urlEndpoint = `${baseURL}${config.apiZNNURSEDISCHSUMSRV}/LatestDocSet?$filter=Einri eq '${req.body.Einri}' and Falnr eq '${req.body.Falnr}' and Patnr eq '${req.body.Patnr}' and Lfdnr eq '${req.body.Lfdnr}'&$format=json`;
    request(
      {
        method: "GET",
        uri: `${urlEndpoint}`,
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
          if (response.statusCode != 200) {
            logger.log(
              "error",
              `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`
            );
          }
          return res.status(response.statusCode).json(body);
        }
      }
    );
  };

  exports.deleteNursingDischargeDoc = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies["MYSAPSSO2"]);
    let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNNURSEDISCHSUMSRV}/NurseDischSumSet(Dockey='${req.body.Dockey}')`;
    request(
      {
        method: "DELETE",
        uri: `${urlEndpoint}`,
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
          logger.log("error", error.message);
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
          if (response.statusCode != 200) {
            logger.log(
              "error",
              `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`
            );
          }
          return res.status(response.statusCode).json(body);
        }
      }
    );
  };

  exports.createNursingDischargeDoc = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies["MYSAPSSO2"]);
    let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
    const urlEndpoint = String.raw`${baseURL}${config.apiZNNURSEDISCHSUMSRV}/NurseDischSumSet`;
    request(
      {
        method: "POST",
        uri: `${urlEndpoint}`,
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
          logger.log("error", error.message);
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
          if (response.statusCode != 200) {
            logger.log(
              "error",
              `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`
            );
          }
          return res.status(response.statusCode).json(body);
        }
      }
    );
  };

 exports.getDayCaseNotPhysicionOrder = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies["MYSAPSSO2"]);
    let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });
    const urlEndpoint = String.raw`${baseURL}ZAB_EMR_NURSE_SRV/PhyorderNotExecutedSet?$filter=(Deptcode eq '${req.body.Deptcode}' and (Date ge datetime'${req.body.fromDate}' and Date le datetime'${req.body.toDate}'))&$format=json`;
    request(
      {
        method: "get",
        uri: `${urlEndpoint}`,
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
          logger.log("error", error.message);
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
          if (response.statusCode != 200) {
            logger.log(
              "error",
              `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:emergency-dashboard.js`
            );
          }
          return res.status(response.statusCode).json(body);
        }
      }
    );
  };


  exports.getDayCaseNoConsumablesSet = (req, res) => {
    let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
    const urlEndpoint  = baseURL + config.apiZABEMRNURSESRV + `/NoConsumablesSet?$filter=(Deptcode eq '${req.query.Deptcode}' and (Date ge datetime'${req.query.Datege}' and Date le datetime'${req.query.Datele}'))&$format=json`;
    console.log(urlEndpoint,"NoConsumablesSet");
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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:day-case-dashboard.js`);
            }
            return res.status(response.statusCode).json(body);
        }
    })
}