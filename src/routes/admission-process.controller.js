const request = require('request');
const express = require("express");
const router = express.Router();
const axios = require("axios");
const config = require('../../config/env.config');
const logger = require('../../utils/logger');

const baseURL = `${config.apiEndpoint}:${config.apiEndpointPort}${config.apiSAPCatlogEndpoint}`;

router.get("/getPhyOrderSet/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies["MYSAPSSO2"]);
    let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });
  
    const { institutionid , caseid,admdatefrom,admdateto,progroup } = req.query;

    let dateFromfilter = '';
    if (admdatefrom && admdateto) {
      dateFromfilter = `and (CreationDate ge datetime'${admdatefrom}' and CreationDate le datetime'${admdateto}')`;
    }
  
    let progroupfilter = '';
    if (progroup) {
      progroupfilter = `and ProfessionalGroup eq '${progroup}'`;
    }
  
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRPHYORDERSRV}/PhyOrderSet?$filter=(InstitutionId eq '${institutionid}' and CaseId eq '${caseid}' ${progroupfilter} ${dateFromfilter})`;
  
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
      jar: j,
    };
  
    request.get(options, (error, response, body) => {
      if (error) {
         logger.log('error',error.message)
        res.json({ message: err });
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
        logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:admission-process.controller.js`);
      }
        if (response.statusCode == 401) {
          return res.status(response.statusCode).json(body);
        } else {
          return res.status(response.statusCode).json(JSON.parse(body));
        }
      }
    });
  });

  
router.get("/getTemplateSet/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies["MYSAPSSO2"]);
    let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });
  
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRPHYORDERSRV}/TemplateSet?$expand=TemplateHeaderItem`;
  
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
      jar: j,
    };
  
    request.get(options, (error, response, body) => {
      if (error) {
         logger.log('error',error.message)
        res.json({ message: err });
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
          logger.log('error',`${response.statusCode + ' ' + body}`)
        }
        if (response.statusCode == 401) {
          return res.status(response.statusCode).json(body);
        } else {
          return res.status(response.statusCode).json(JSON.parse(body));
        }
      }
    });
  });

  
router.post("/saveTemplateSet", async (req, res) => {
    const urlEndpoint = `${baseURL}${config.apiZABEMRPHYORDERSRV}/TemplateSet`;

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
        logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:admission-process.controller.js`);
      }
            return res.status(response.statusCode).json(body);
        }
    })
});


router.delete("/deleteTemplateSet/:templateKey", async (req, res) => {
  const { templateKey } = req.params;
  
  const urlEndpoint = `${baseURL}${config.apiZABEMRPHYORDERSRV}/TemplateSet('${templateKey}')`;

  let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
  let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

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
        logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:admission-process.controller.js`);
      }
          return res.status(response.statusCode).json(body);
      }
  })
});


//#region Progress Notes

router.get("/getProgressNote/", (req, res) => {
  let mysapSSO2Value = decodeURIComponent(req.cookies["MYSAPSSO2"]);
  let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
  var j = request.jar();
  var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

  const { patientId , caseid,admdatefrom,admdateto,progroup } = req.query;

  let dateFromfilter = '';
  if (admdatefrom && admdateto) {
    dateFromfilter = `and (CreationDate ge datetime'${admdatefrom}' and CreationDate le datetime'${admdateto}')`;
  }

  let progroupfilter = '';
  if (progroup) {
    progroupfilter = `and ProfGroup eq '${progroup}'`;
  }

  const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRPDCNOTESSRV}/ProgressNoteSet?$filter=(PatientId eq '${patientId}' and CaseId eq '${caseid}' ${progroupfilter} ${dateFromfilter})`;

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
    jar: j,
  };

  request.get(options, (error, response, body) => {
    if (error) {
       logger.log('error',error.message)
      res.json({ message: err });
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
        logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:admission-process.controller.js`);
      }
      
      if (response.statusCode == 401) {
        return res.status(response.statusCode).json(body);
      } else {
        return res.status(response.statusCode).json(JSON.parse(body));
      }
    }
  });
});



router.get("/getCategorySet/", (req, res) => {
  let mysapSSO2Value = decodeURIComponent(req.cookies["MYSAPSSO2"]);
  let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
  var j = request.jar();
  var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

  const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRPDCNOTESSRV}/CategorySet`;

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
    jar: j,
  };

  request.get(options, (error, response, body) => {
    if (error) {
       logger.log('error',error.message)
      res.json({ message: err });
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
        logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:admission-process.controller.js`);
      }
      
      if (response.statusCode == 401) {
        return res.status(response.statusCode).json(body);
      } else {
        return res.status(response.statusCode).json(JSON.parse(body));
      }
    }
  });
});



router.get("/getCancelReasonSet/", (req, res) => {
  let mysapSSO2Value = decodeURIComponent(req.cookies["MYSAPSSO2"]);
  let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
  var j = request.jar();
  var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

  const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRPDCNOTESSRV}/CancelReasonSet`;

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
    jar: j,
  };

  request.get(options, (error, response, body) => {
    if (error) {
       logger.log('error',error.message)
      res.json({ message: err });
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
        logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:admission-process.controller.js`);
      }
      
      if (response.statusCode == 401) {
        return res.status(response.statusCode).json(body);
      } else {
        return res.status(response.statusCode).json(JSON.parse(body));
      }
    }
  });
});

router.get("/getTextModulesSet/", (req, res) => {
  let mysapSSO2Value = decodeURIComponent(req.cookies["MYSAPSSO2"]);
  let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
  var j = request.jar();
  var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

  const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRPDCNOTESSRV}/TextModulesSet`;

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
    jar: j,
  };

  request.get(options, (error, response, body) => {
    if (error) {
       logger.log('error',error.message)
      res.json({ message: err });
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
        logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:admission-process.controller.js`);
      }
      
      if (response.statusCode == 401) {
        return res.status(response.statusCode).json(body);
      } else {
        return res.status(response.statusCode).json(JSON.parse(body));
      }
    }
  });
});

router.delete("/deleteProgressNote/", async (req, res) => {
  const { notekey,patientId,cancelcause } = req.query;
  const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRPDCNOTESSRV}/ProgressNoteSet(Notekey='${notekey}',PatientId='${patientId}')`;

  let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
  let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
  let body={"Notekey":`${notekey}`,"PatientId":`${patientId}`,"CancelCause":`${cancelcause}`};

  request({
      method: 'PUT',
      uri: urlEndpoint,
      body:  body,
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
        logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:admission-process.controller.js`);
      }
          return res.status(response.statusCode).json(body);
      }
  })
});

router.post("/replaceProgressNote/", async (req, res) => {
  const { notekey,patientId,cancelcause } = req.query;
  const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRPDCNOTESSRV}/ProgressNoteSet(Notekey='${notekey}',PatientId='${patientId}')`;

  let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
  let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

  request({
      method: 'PUT',
      uri: urlEndpoint,
      body:  req.body,
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
        logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:admission-process.controller.js`);
      }
      if(body == undefined) {
          return res.status(response.statusCode).json('Success');
      } 
          return res.status(response.statusCode).json(body);
      }
  })
});

//#endregion

//#region Diagnosis
 
router.get("/getDiagnosisSet/", (req, res) => {
  let mysapSSO2Value = decodeURIComponent(req.cookies["MYSAPSSO2"]);
  let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
  var j = request.jar();
  var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

  const { institutionid , caseid, patnr } = req.query;

  let urlEndpoint = String.raw`${baseURL}${config.apiZABEMRDIAGNOSISSRV}/DiagnosisSet?$filter=(Institution eq '${institutionid}' and Patcaseid eq '${caseid}')`;
  
  if(patnr){
    urlEndpoint = String.raw`${baseURL}${config.apiZABEMRDIAGNOSISSRV}/DiagnosisSet?$filter=(Patnr eq '${patnr}')`;  
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
    jar: j,
  };

  request.get(options, (error, response, body) => {
    if (error) {
       logger.log('error',error.message)
      res.json({ message: err });
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
        logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:admission-process.controller.js`);
      }
      
      if (response.statusCode == 401) {
        return res.status(response.statusCode).json(body);
      } else {
        return res.status(response.statusCode).json(JSON.parse(body));
      }
    }
  });
});


router.post("/saveDiagnosisSet", async (req, res) => {
  const urlEndpoint = `${baseURL}${config.apiZABEMRDIAGNOSISSRV}/PatientSet`;

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
        logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:admission-process.controller.js`);
      }
          return res.status(response.statusCode).json(body);
      }
  })
});


router.get("/getDiagnosisCodeSet/", (req, res) => {
  let mysapSSO2Value = decodeURIComponent(req.cookies["MYSAPSSO2"]);
  let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
  var j = request.jar();
  var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

  const { searchstring } = req.query;

  const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRDIAGNOSISSRV}/DiagnosisCodeSet?$filter=(startswith(Dkey, '${searchstring}'))`;

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
    jar: j,
  };

  request.get(options, (error, response, body) => {
    if (error) {
       logger.log('error',error.message)
      res.json({ message: err });
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
        logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:admission-process.controller.js`);
      }
      
      if (response.statusCode == 401) {
        return res.status(response.statusCode).json(body);
      } else {
        return res.status(response.statusCode).json(JSON.parse(body));
      }
    }
  });
});



router.get("/getDiagnosisImport/", (req, res) => {
  let mysapSSO2Value = decodeURIComponent(req.cookies["MYSAPSSO2"]);
  let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
  var j = request.jar();
  var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

  const { patientId } = req.query;

  const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRDIAGNOSISSRV}/DiagnosisSet?$filter=(Patnr eq '${patientId}')`;

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
    jar: j,
  };

  request.get(options, (error, response, body) => {
    if (error) {
       logger.log('error',error.message)
      res.json({ message: err });
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
        logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:admission-process.controller.js`);
      }
      
      if (response.statusCode == 401) {
        return res.status(response.statusCode).json(body);
      } else {
        return res.status(response.statusCode).json(JSON.parse(body));
      }
    }
  });
});



router.get("/getFavrDiagnosisSet/", (req, res) => {
  let mysapSSO2Value = decodeURIComponent(req.cookies["MYSAPSSO2"]);
  let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
  var j = request.jar();
  var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });


  const { orgid,einri, type } = req.query;

  let orgidfilter = '';
  if (orgid) {
    orgidfilter = `Orgid eq '${orgid}' and `;
  }


  const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRDIAGNOSISSRV}/FavrDiagnosisSet?$filter=(Typ eq '${type}' and Einri eq '${einri}' and  ${orgidfilter} Dkat eq '10')`;

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
    jar: j,
  };

  request.get(options, (error, response, body) => {
    if (error) {
       logger.log('error',error.message)
      res.json({ message: err });
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
        logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:admission-process.controller.js`);
      }
      
      if (response.statusCode == 401) {
        return res.status(response.statusCode).json(body);
      } else {
        return res.status(response.statusCode).json(JSON.parse(body));
      }
    }
  });
});

router.post("/updateDiagnosisFavrOUSet", async (req, res) => {
  const urlEndpoint = `${baseURL}${config.apiZABEMRDIAGNOSISSRV}/FavrOUSet`;

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
         logger.log('error',error.message)
          res.json(error);
          return console.dir(error);
      }
      else {
          //console.log(body);
            if(response.statusCode != 200){
        logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:admission-process.controller.js`);
      }
          return res.status(response.statusCode).json(body);
      }
  })
});
//#endregion


//#region Documentation

router.get("/getProfileDocsSet/", (req, res) => {
  let mysapSSO2Value = decodeURIComponent(req.cookies["MYSAPSSO2"]);
  let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
  var j = request.jar();
  var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });


  const {einri,type,patnr,dodate,falnr } = req.query;

  
  let dodatefilter = '';
  if (dodate) {
    dodatefilter = `and   Dodat eq datetime'${dodate}' `;
  }


  const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRIPNDOCSRV}/ProfileDocsSet?$filter=(Typ eq '${type}' and Einri eq '${einri}' and Patnr eq '${patnr}' ${dodatefilter}  and Falnr eq '${falnr}')`;

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
    jar: j,
  };

  request.get(options, (error, response, body) => {
    if (error) {
       logger.log('error',error.message)
      res.json({ message: err });
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
        logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:admission-process.controller.js`);
      }
      
      if (response.statusCode == 401) {
        return res.status(response.statusCode).json(body);
      } else {
        return res.status(response.statusCode).json(JSON.parse(body));
      }
    }
  });
});


router.post("/saveEduAssesSet", async (req, res) => {
  const urlEndpoint = `${baseURL}${config.apiZNEDUASSESSRV}/EduAssesSet`;

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
        logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:admission-process.controller.js`);
      }
      return res.status(response.statusCode).json(body);
    }
  })
});

router.get("/getEduAssesSet/", (req, res) => {
  let mysapSSO2Value = decodeURIComponent(req.cookies["MYSAPSSO2"]);
  let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
  var j = request.jar();
  var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

  const { dockey, falnr } = req.query;
  const urlEndpoint = String.raw`${baseURL}${config.apiZNEDUASSESSRV}/EduAssesSet?$filter=(Dockey eq '${dockey}')&$expand=TOITEM`;


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
    jar: j,
  };

  request.get(options, (error, response, body) => {
    if (error) {
       logger.log('error',error.message)
      res.json({ message: err });
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
        logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:admission-process.controller.js`);
      }
      
      if (response.statusCode == 401) {
        return res.status(response.statusCode).json(body);
      } else {
        return res.status(response.statusCode).json(JSON.parse(body));
      }
    }
  });
});


router.post("/getEduAssesLatestDocSet/", (req, res) => {
  let mysapSSO2Value = decodeURIComponent(req.cookies["MYSAPSSO2"]);
  let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
  var j = request.jar();
  var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

  const urlEndpoint = String.raw`${baseURL}${config.apiZNEDUASSESSRV}/LatestDocSet?$filter=( Einri eq '${req.body.Einri}' and Falnr eq '${req.body.Falnr}' and Patnr eq '${req.body.Patnr}' and Lfdnr eq '${req.body.Lfdnr}')`;

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
    jar: j,
  };

  request.get(options, (error, response, body) => {
    if (error) {
       logger.log('error',error.message)
      res.json({ message: err });
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
        logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:admission-process.controller.js`);
      }
      
      if (response.statusCode == 401) {
        return res.status(response.statusCode).json(body);
      } else {
        return res.status(response.statusCode).json(JSON.parse(body));
      }
    }
  });
});

router.delete("/deleteEduAssesSet/:dockey", async (req, res) => {
  const { dockey } = req.params;

  const urlEndpoint = `${baseURL}${config.apiZNEDUASSESSRV}/EduAssesSet(Dockey='${dockey}')`;

  let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
  let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

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
        logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:admission-process.controller.js`);
      }
      return res.status(response.statusCode).json(body);
    }
  })
});

router.get("/getPDFFileSet/", (req, res) => {
  let mysapSSO2Value = decodeURIComponent(req.cookies["MYSAPSSO2"]);
  let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
  var j = request.jar();
  var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });
  const { dockey } = req.query;
  const urlEndpoint = `${baseURL}${config.apiZNEDUASSESSRV}/PDFFileSet(Dockey='${dockey}')`;

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
    jar: j,
  };

  request.get(options, (error, response, body) => {
    if (error) {
       logger.log('error',error.message)
      res.json({ message: err });
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
        logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:admission-process.controller.js`);
      }
      
      if (response.statusCode == 401) {
        return res.status(response.statusCode).json(body);
      } else {
        return res.status(response.statusCode).json(JSON.parse(body));
      }
    }
  });
});
router.get("/getPDFFileSoapSet/", (req, res) => {
  let mysapSSO2Value = decodeURIComponent(req.cookies["MYSAPSSO2"]);
  let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
  var j = request.jar();
  var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });
  const { dockey } = req.query;
  const urlEndpoint = `${baseURL}${config.apiZNSOAPSRV}/PDFFileSet(Dockey='${dockey}')`;
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
    jar: j,
  };

  request.get(options, (error, response, body) => {
    if (error) {
       logger.log('error',error.message)
      res.json({ message: err });
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
        logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:admission-process.controller.js`);
      }
      
      if (response.statusCode == 401) {
        return res.status(response.statusCode).json(body);
      } else {
        return res.status(response.statusCode).json(JSON.parse(body));
      }
    }
  });
});
router.get("/getPatientProfilePDFFileSet/", (req, res) => {
  let mysapSSO2Value = decodeURIComponent(req.cookies["MYSAPSSO2"]);
  let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
  var j = request.jar();
  var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });
  const { dockey } = req.query;
  const urlEndpoint = `${baseURL}${config.apiPatientUserEndpoint}/AttachmentSet(DocKey='${dockey}',FileID='')`;
  console.log(urlEndpoint);
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
    jar: j,
  };

  request.get(options, (error, response, body) => {
    if (error) {
       logger.log('error',error.message)
      res.json({ message: err });
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
        logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:admission-process.controller.js`);
      }
      if (response.statusCode == 401) {
        return res.status(response.statusCode).json(body);
      } else {
        return res.status(response.statusCode).json(JSON.parse(body));
      }
    }
  });
});
//#endregion
// progress notes save temp
router.post("/saveProgressNotesTemplate", async (req, res) => {
  const urlEndpoint = `${baseURL}${config.apiZABEMRPNOTESRV}/TextModuleSet?`;

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
        logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:admission-process.controller.js`);
      }
          return res.status(response.statusCode).json(body);
      }
  })
});

router.post("/saveVisitNoteDocument", async (req, res) => {
  const urlEndpoint = `${baseURL}${config.apiZABEMRVISITNOTESRV}/FormDataSet`;
  console.log(urlEndpoint)
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
         logger.log('error',error.message)
          res.json(error);
          return console.dir(error);
      }
      else {
          //console.log(body);
            if(response.statusCode != 200){
        logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:admission-process.controller.js`);
      }
          return res.status(response.statusCode).json(body);
      }
  })
});

router.get("/getVisitNoteDocument/", (req, res) => {
  let mysapSSO2Value = decodeURIComponent(req.cookies["MYSAPSSO2"]);
  let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
  var j = request.jar();
  var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });
  const { docKey } = req.query;
  const urlEndpoint = `${baseURL}${config.apiZABEMRVISITNOTESRV}/FormDataSet?$filter=( Dockey eq '${docKey}' )&$expand=ToDiagnosis,ToAttachment`;
  console.log(urlEndpoint);
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
    jar: j,
  };

  request.get(options, (error, response, body) => {
    if (error) {
       logger.log('error',error.message)
      res.json({ message: err });
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
        logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:admission-process.controller.js`);
      }
      if (response.statusCode == 401) {
        return res.status(response.statusCode).json(body);
      } else {
        return res.status(response.statusCode).json(JSON.parse(body));
      }
    }
  });
});

router.post("/releaseVisitNoteDocument", async (req, res) => {
  
  const urlEndpoint = `${baseURL}${config.apiZABEMRVISITNOTESRV}/DocRelease?Dockey='${req.body.Dockey}'`;
  // const urlEndpoint = `${baseURL}${config.apiZABEMRVISITNOTESRV}/FormDataSet`;
  console.log(urlEndpoint)
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
         logger.log('error',error.message)
          // res.json(error);
          // return console.dir(error);
      }
      else {
          //console.log(body);
            if(response.statusCode != 200){
        logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:admission-process.controller.js`);
      }
          return res.status(response.statusCode).json(body);
      }
  })
});

router.delete("/deleteVisitNotDocument/:dockey", async (req, res) => {
  const { dockey } = req.params;
  
  const urlEndpoint = `${baseURL}${config.apiZABEMRVISITNOTESRV}/FormDataSet(Dockey='${dockey}')`;

  let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
  let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

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
        logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:admission-process.controller.js`);
      }
          return res.status(response.statusCode).json(body);
      }
  })
});


module.exports = router;