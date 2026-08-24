const request = require('request');
const express = require("express");
const router = express.Router();
const axios = require("axios");
const config = require('../../config/env.config');
const logger = require('../../utils/logger');

const baseURL = `${config.apiEndpoint}:${config.apiEndpointPort}${config.apiSAPCatlogEndpoint}`;

router.get("/getOrderSetHeaderSet/", (req, res) => {
    let mysapSSO2Value = decodeURIComponent(req.cookies["MYSAPSSO2"]);
    let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
    var j = request.jar();
    var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
    j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });
  
    const { statusid,admdatefrom,admdateto,deptou } = req.query;

    let dateFromfilter = '';
    if (admdatefrom && admdateto) {
      dateFromfilter = `and (Date ge datetime'${admdatefrom}' and Date le datetime'${admdateto}')`;
    }
  
    let statusidfilter = '';
    if (statusid) {
      statusidfilter = `and StatusApr  eq '${statusid}'`;
    }
  
    const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRORDSETSRV}/OrderSetHeaderSet?$filter=(DeptOu  eq '${deptou}' ${statusidfilter} ${dateFromfilter})`;
  
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
         logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:order-dashboard.controller.js`);
        }
        if (response.statusCode == 401) {
          return res.status(response.statusCode).json(body);
        } else {
          return res.status(response.statusCode).json(JSON.parse(body));
        }
      }
    });
  });

  
router.get("/getDeptSet/", (req, res) => {
  let mysapSSO2Value = decodeURIComponent(req.cookies["MYSAPSSO2"]);
  let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
  var j = request.jar();
  var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

  const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRIPLISTSRV}/DeptSet`;

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
         logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:order-dashboard.controller.js`);
        }
      if (response.statusCode == 401) {
        return res.status(response.statusCode).json(body);
      } else {
        return res.status(response.statusCode).json(JSON.parse(body));
      }
    }
  });
});

router.get("/getEmployeeResponsibleSet/", (req, res) => {
  let mysapSSO2Value = decodeURIComponent(req.cookies["MYSAPSSO2"]);
  let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
  var j = request.jar();
  var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

  const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRMDSRV}/EmployeeResponsibleSet`;

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
      res.json({ message: error });
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
         logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:order-dashboard.controller.js`);
        }
      if (response.statusCode == 401) {
        return res.status(response.statusCode).json(body);
      } else {
        return res.status(response.statusCode).json(JSON.parse(body));
      }
    }
  });
});

router.get("/getAgeRangeSet/", (req, res) => {
  let mysapSSO2Value = decodeURIComponent(req.cookies["MYSAPSSO2"]);
  let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
  var j = request.jar();
  var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

  const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRORDSETSRV}/AgeRangeSet`;

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
         logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:order-dashboard.controller.js`);
        }
      if (response.statusCode == 401) {
        return res.status(response.statusCode).json(body);
      } else {
        return res.status(response.statusCode).json(JSON.parse(body));
      }
    }
  });
});

router.get("/getOrderSetByOrderId/", (req, res) => {
  let mysapSSO2Value = decodeURIComponent(req.cookies["MYSAPSSO2"]);
  let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
  var j = request.jar();
  var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

  const { Id } = req.query;

  const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRORDSETSRV}/OrderSetHeaderSet?$filter=( Id eq '${Id}' )&$expand=ToDiag,ToAccess,ToSubtitle,ToMedOrd/ToMedComplex,ToPhyOrd,ToLab,ToRad,ToServices,ToNdia,ToSurgy,ToAdm`;
  
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
         logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:order-dashboard.controller.js`);
        }
      if (response.statusCode == 401) {
        return res.status(response.statusCode).json(body);
      } else {
        return res.status(response.statusCode).json(JSON.parse(body));
      }
    }
  });
});

router.post("/saveOrderSetHeaderSet/", async (req, res) => {
  const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRORDSETSRV}/OrderSetHeaderSet`;

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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:order-dashboard.controller.js`);
            }
          return res.status(response.statusCode).json(body);
      }
  })
});



router.get("/getOrdersetSubtitle/", (req, res) => {
  let mysapSSO2Value = decodeURIComponent(req.cookies["MYSAPSSO2"]);
  let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
  var j = request.jar();
  var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

  const { Id } = req.query;

  const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRORDSETSRV}/OrderSetSubtitleSet?$filter=( Id eq '${Id}' )`;
  
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
         logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:order-dashboard.controller.js`);
        }
      if (response.statusCode == 401) {
        return res.status(response.statusCode).json(body);
      } else {
        return res.status(response.statusCode).json(JSON.parse(body));
      }
    }
  });
});

router.post("/saveOrdersetSubtitle/", async (req, res) => {
  const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRORDSETSRV}/OrdersetSubtitleHSet`;

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
              logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:order-dashboard.controller.js`);
            }
          return res.status(response.statusCode).json(body);
      }
  })
});


router.get("/sendForStatusChange/", (req, res) => {
  
  const { Id } = req.query;

  const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRORDSETSRV}/Approve?Id='${Id}'`;

  let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
  let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
  
  request({
      method: 'POST',
      uri: urlEndpoint,
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
            logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:order-dashboard.controller.js`);
          }
          return res.status(response.statusCode).json(body);
      }
  })
});


router.get("/getOrderServicesSet", (req, res) => {
  let mysapSSO2Value = decodeURIComponent(req.cookies["MYSAPSSO2"]);
  let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
  var j = request.jar();
  var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

  const { einri,tarif,category,searchtext } = req.query;

  const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRMDSRV}/ServicesSet?$filter=(Einri eq '${einri}' and Tarif eq '${tarif}' and Category eq '${category}' and startswith(Talst, '${searchtext}'))`;

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
         logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:order-dashboard.controller.js`);
        }
      if (response.statusCode == 401) {
        return res.status(response.statusCode).json(body);
      } else {
        return res.status(response.statusCode).json(JSON.parse(body));
      }
    }
  });
});


router.get("/getOrderServicesSetWithDistinct", (req, res) => {
  let mysapSSO2Value = decodeURIComponent(req.cookies["MYSAPSSO2"]);
  let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
  var j = request.jar();
  var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

  const { einri,tarif,category,searchtext } = req.query;

  const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRMDSRV}/ServicesSet?$filter=(Einri eq '${einri}' and Tarif eq '${tarif}' and Category eq '${category}' and startswith(Talst, '${searchtext}') and Distinct eq true)`;

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
         logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:order-dashboard.controller.js`);
        }
      if (response.statusCode == 401) {
        return res.status(response.statusCode).json(body);
      } else {
        return res.status(response.statusCode).json(JSON.parse(body));
      }
    }
  });
});


router.get("/getOrderTreatmentOUSet", (req, res) => {
  let mysapSSO2Value = decodeURIComponent(req.cookies["MYSAPSSO2"]);
  let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
  var j = request.jar();
  var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

  const { einri,searchtext } = req.query;

  const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRMDSRV}/TreatmentOUSet?$filter=(Einri eq '${einri}' and startswith(Orgid, '${searchtext}'))`;

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
         logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:order-dashboard.controller.js`);
        }
      if (response.statusCode == 401) {
        return res.status(response.statusCode).json(body);
      } else {
        return res.status(response.statusCode).json(JSON.parse(body));
      }
    }
  });
});

router.get("/getOrderTreatmentDOUSet", (req, res) => {
  let mysapSSO2Value = decodeURIComponent(req.cookies["MYSAPSSO2"]);
  let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
  var j = request.jar();
  var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

  const { einri,searchtext } = req.query;

  const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRMDSRV}/TreatmentDOUSet?$filter=(Einri eq '${einri}' and startswith(Orgid, '${searchtext}'))`;

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
         logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:order-dashboard.controller.js`);
        }
      if (response.statusCode == 401) {
        return res.status(response.statusCode).json(body);
      } else {
        return res.status(response.statusCode).json(JSON.parse(body));
      }
    }
  });
});


router.get("/getOrderDeptOUSet", (req, res) => {
  let mysapSSO2Value = decodeURIComponent(req.cookies["MYSAPSSO2"]);
  let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
  var j = request.jar();
  var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

  const { einri,searchtext } = req.query;

  const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRMDSRV}/DeptOUSet?$filter=(Einri eq '${einri}'  and startswith(Orgid, '${searchtext}'))`;

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
         logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:order-dashboard.controller.js`);
        }
      if (response.statusCode == 401) {
        return res.status(response.statusCode).json(body);
      } else {
        return res.status(response.statusCode).json(JSON.parse(body));
      }
    }
  });
});


router.delete("/deleteOrderSetHeaderSet/:ordersetkey", async (req, res) => {
  const { ordersetkey } = req.params;
  
  const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRORDSETSRV}/OrderSetHeaderSet('${ordersetkey}')`;
  
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
         logger.log('error', `Status Code: ${response.statusCode}\nBody: ${body}\nURL Endpoint: ${urlEndpoint}\nFile Name:order-dashboard.controller.js`);
        }
          return res.status(response.statusCode).json(body);
      }
  })
});

module.exports = router;