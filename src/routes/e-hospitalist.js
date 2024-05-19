const request = require("request");
const express = require("express");
const router = express.Router();
const axios = require("axios");
const config = require("../../config/env.config");
const logger = require('../../utils/logger');

const baseURL = `${config.apiEndpoint}:${config.apiEndpointPort}${config.apiSAPCatlogEndpoint}`;

router.use((req, res, next) => {
  console.log("Patient Data Middleware Time: ", Date.now());
  next();
});

router.get("/getIpListSet/", (req, res) => {
  let mysapSSO2Value = decodeURIComponent(req.cookies["MYSAPSSO2"]);
  let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
  var j = request.jar();
  var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

  const { typ_eq, admdatefrom, admdateto, floor, physician } = req.query;

  let dateFromfilter = '';
  if (admdatefrom) {
    dateFromfilter = `and (AdmDateFrom eq datetime'${admdatefrom}')`;
  }

  let datefilter = '';
  if (admdateto) {
    datefilter = `and (AdmDateTo eq datetime'${admdateto}')`;
  }


  let floorfilter = '';
  if (floor) {

    let floorFilterarr = [];
    var str_array = floor.split(',');
    for (var i = 0; i < str_array.length; i++) {
      // Trim the excess whitespace.
      let value = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
      if (value) {
        // Add additional code here, such as:
        floorFilterarr.push(` Floor eq '${value}' `);

      }
    }

    if (floorFilterarr.length > 0) {
      floorfilter = `and (${floorFilterarr.join(' or ')})`;
    }

  }





  let phyfilter = '';
  if (physician) {
    let phyfilterarr = [];
    var str_array = physician.split(',');

    for (var i = 0; i < str_array.length; i++) {
      // Trim the excess whitespace.
      let value = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
      if (value) {
        // Add additional code here, such as:
        phyfilterarr.push(` AttendingDoctor eq '${value}' `);

      }
    }

    if (phyfilterarr.length > 0) {
      phyfilter = `and (${phyfilterarr.join(' or ')})`;
    }
  }

  const urlEndpoint = String.raw`${baseURL}ZAB_EMR_IP_LIST_SRV/IPLISTSET?$filter=((Typ eq '${typ_eq}') ${dateFromfilter} ${datefilter} ${floorfilter} ${phyfilter})`;

  //   /ZAB_EMR_IP_LIST_SRV/IPLISTSET?$filter=( Typ eq '02' )
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
      res.json({ message: err });
      logger.log('error',error.message)
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


router.get("/getHospitalSet/", (req, res) => {
  let mysapSSO2Value = decodeURIComponent(req.cookies["MYSAPSSO2"]);
  let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
  var j = request.jar();
  var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

  const { typ_eq, admdatefrom, admdateto, floor, physician, deptou, reporttype } = req.query;

  let dateFromfilter = '';
  if (admdatefrom) {
    dateFromfilter = `and (AdmDateFrom eq datetime'${admdatefrom}')`;
  }

  let datefilter = '';
  if (admdateto) {
    datefilter = `and (AdmDateTo eq datetime'${admdateto}')`;
  }


  let floorfilter = '';
  if (floor) {

    let floorFilterarr = [];
    var str_array = floor.split(',');
    for (var i = 0; i < str_array.length; i++) {
      // Trim the excess whitespace.
      let value = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
      if (value) {
        // Add additional code here, such as:
        floorFilterarr.push(` Floor eq '${value}' `);

      }
    }

    if (floorFilterarr.length > 0) {
      floorfilter = `and (${floorFilterarr.join(' or ')})`;
    }

  }




  let phyfilter = '';
  if (physician) {
    let phyfilterarr = [];
    var str_array = physician.split(',');

    for (var i = 0; i < str_array.length; i++) {
      // Trim the excess whitespace.
      let value = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
      if (value) {
        // Add additional code here, such as:
        phyfilterarr.push(` AttendingDoctor eq '${value}' `);

      }
    }

    if (phyfilterarr.length > 0) {
      phyfilter = `and (${phyfilterarr.join(' or ')})`;
    }
  }


  let deptoufilter = '';
  if (deptou) {
    let deptoufilterarr = [];

    var str_array = deptou.split(',');

    for (var i = 0; i < str_array.length; i++) {
      // Trim the excess whitespace.
      let value = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
      if (value) {
        // Add additional code here, such as:
        deptoufilterarr.push(` Deptou eq '${value}' `);
      }
    }

    if (deptoufilterarr.length > 0) {
      deptoufilter = `and (${deptoufilterarr.join(' or ')})`;
    }
  }



  let expandFields = 'ToIPList,ToPhysician,ToDept';

  let reporttypefilter = '';
  if (reporttype == '02') {
    reporttypefilter = `and (Report eq '${reporttype}')`;
    expandFields = 'ToLabList,ToPhysician,ToDept';
  }

  if (reporttype == '03') {
    reporttypefilter = `and (Report eq '${reporttype}')`;
    expandFields = 'ToRadList,ToPhysician,ToDept';
  }
  
  if (reporttype == '04') {
    reporttypefilter = `and (Report eq '${reporttype}')`;
    expandFields = 'ToMedList,ToPhysician,ToDept';
  }

  if (reporttype == '05') {
    reporttypefilter = `and (Report eq '${reporttype}')`;
    expandFields = 'ToPordList,ToPhysician,ToDept';
  }

  let urlEndpoint = '';

  if (typ_eq == '06') {
    dateFromfilter = '';
    if (admdatefrom) {
      dateFromfilter = `Bwidt ge datetime'${admdatefrom}'`;
    }

    datefilter = '';
    if (admdateto) {
      datefilter = `and Bwidt le datetime'${admdateto}'`;
    }

    let dylisisDateFilter='';
    if(dateFromfilter && datefilter){
      dylisisDateFilter=` and (${dateFromfilter} ${datefilter})`;
    }

    let dialysisFilter='';
    if(dylisisDateFilter || floorfilter || phyfilter || deptoufilter){



    }

    urlEndpoint = String.raw`${baseURL}${config.apiZABEMRDIALYSISSRV}/DialysisListSet$filter=((Typ eq '${typ_eq}') ${dylisisDateFilter} ${phyfilter})`;
  }
  else {
    urlEndpoint = String.raw`${baseURL}ZAB_EMR_IP_LIST_SRV/HospitalSet$filter=((Typ eq '${typ_eq}') ${reporttypefilter} ${dateFromfilter} ${datefilter} ${floorfilter} ${phyfilter} ${deptoufilter})&$expand=${expandFields}`;
  }
  //   /ZAB_EMR_IP_LIST_SRV/IPLISTSET?$filter=( Typ eq '02' )
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
      res.json({ message: err });
      logger.log('error',response.statusMessage)
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

router.get("/getPhysicianList/", (req, res) => {
  let mysapSSO2Value = decodeURIComponent(req.cookies["MYSAPSSO2"]);
  let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
  var j = request.jar();
  var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

  const { typ_eq, admdatefrom, admdateto, floor } = req.query;

  let dateFromfilter = '';
  if (admdatefrom) {
    dateFromfilter = `and (AdmDateFrom eq datetime'${admdatefrom}')`;
  }

  let datefilter = '';
  if (admdateto) {
    datefilter = `and (AdmDateTo eq datetime'${admdateto}')`;
  }


  let floorfilter = '';
  if (floor) {

    var str_array = floor.split(',');

    for (var i = 0; i < str_array.length; i++) {
      // Trim the excess whitespace.
      str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
      // Add additional code here, such as:
      floorfilter += ` Floor eq '${str_array[i]}' `;

      if (i < str_array.length - 1) {
        floorfilter += ' or '
      }
    }

    floorfilter = `and (${floorfilter})`;
  }

  const urlEndpoint = String.raw`${baseURL}ZAB_EMR_IP_LIST_SRV/PhysicianSet?$filter=((Typ eq '${typ_eq}') ${dateFromfilter} ${datefilter} ${floorfilter})`;

  //   /ZAB_EMR_IP_LIST_SRV/IPLISTSET?$filter=( Typ eq '02' )
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
      res.json({ message: err });
      logger.log('error',error.message)
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

router.get("/getIplistCountSet/", (req, res) => {
  let mysapSSO2Value = decodeURIComponent(req.cookies["MYSAPSSO2"]);
  let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
  var j = request.jar();
  var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

  const { typ_eq } = req.query;

  const urlEndpoint = String.raw`${baseURL}ZAB_EMR_IP_LIST_SRV/IplistCountSet?$expand=CountChartLabel,CountChartAdm,CountChartNewAdm,CountChartPlanDischarge,CountChartDischarge&$filter=( Typ eq '${typ_eq}' )`;

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
      res.json({ message: err });
      logger.log('error',error.message)
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



router.get("/getDeptOUSet/", (req, res) => {
  let mysapSSO2Value = decodeURIComponent(req.cookies["MYSAPSSO2"]);
  let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
  var j = request.jar();
  var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });
  const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRMDSRV}/DeptOUSet`;

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
      res.json({ message: err });
      logger.log('error',error.message)
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
/////////new
router.post("/getNotPhysicionOrder/", (req, res) => {
  let mysapSSO2Value = decodeURIComponent(req.cookies["MYSAPSSO2"]);
  let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
  var j = request.jar();
  var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });
  const urlEndpoint = String.raw`${baseURL}ZAB_EMR_PHY_ORDER_SRV/PhyorderNotExecutedSet?$filter=(Deptcode eq '${req.body.Deptcode}' and Deptou eq 'EMEMDAMC' and (Bwidt ge datetime'${req.body.fromDate}' and Bwidt le datetime'${req.body.toDate}')`;
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
      res.json({ message: err });
      logger.log('error',error.message)
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

///old
router.post("/getInPatientList", async (req, res) => {
  let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
  let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

  var j = request.jar();
  var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
  let isMultipleFilter = false;

  let floorfilter = '';
  if (req.body.Floor) {

    let floorFilterarr = [];
    var str_array = req.body.Floor.split(',');
    for (var i = 0; i < str_array.length; i++) {
      // Trim the excess whitespace.
      let value = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
      if (value) {
        // Add additional code here, such as:
        floorFilterarr.push(` Floor eq '${value}' `);

      }
    }

    if (floorFilterarr.length > 0) {
      floorfilter = `and (${floorFilterarr.join(' or ')})`;
    }

  }

  
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
    else {
      var ipSetFilter = `/ConsultationSet?$filter=( (Floor eq '${req.body.Floor}') and (Patientstatus eq '${req.body.Patientstatus}'))`;
    }
  }
  if (req.body.module === 'Abnormal_Lab_Results') {
    if (req.body.hasOwnProperty('AdmDateFrom')) {
      var ipSetFilter = `/AbnormalLabSet?$filter=( (AdmDateFrom eq datetime'${req.body.AdmDateFrom}') and (AdmDateTo eq datetime'${req.body.AdmDateTo}') and (Floor eq '${req.body.Floor}') and (Patientstatus eq '${req.body.Patientstatus}'))`;
    }
    else {
      var ipSetFilter = `/AbnormalLabSet?$filter=( (Floor eq '${req.body.Floor}') and (Patientstatus eq '${req.body.Patientstatus}'))`;
    }
  }
  if (req.body.module === 'Abnormal_Rad_Findings') {
    if (req.body.hasOwnProperty('AdmDateFrom')) {
      var ipSetFilter = `/AbnormalRabSet?$filter=( (AdmDateFrom eq datetime'${req.body.AdmDateFrom}') and (AdmDateTo eq datetime'${req.body.AdmDateTo}') and (Floor eq '${req.body.Floor}') and (Patientstatus eq '${req.body.Patientstatus}'))`;
    } else {
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
    var ipSetFilter = `/PhyorderNotExecutedSet?$filter=(Typ eq '${req.body.Typ}') ${floorfilter}`;
  }

  // let dateFromfilter = '';
  //   if (req.body.fromDate) {
  //       dateFromfilter = isMultipleFilter ? ` and ` :  '';
  //       isMultipleFilter = true;
  //       ipSetFilter += `and ( Bwidt ge datetime'${req.body.fromDate}' and Bwidt le datetime'${req.body.toDate}')`;
  //   }

    let url = config.apiEndpointEMRInPatient + 'ZAB_EMR_IP_LIST_SRV' + ipSetFilter
    console.log(url);
  request({
    method: 'GET',
    uri: config.apiEndpointEMRInPatient + 'ZAB_EMR_IP_LIST_SRV' + ipSetFilter,
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
      var ipBody = {
        module: req.body.module,
        result: body
      }
      return res.status(response.statusCode).json(ipBody);
    }
  });
});

router.post("/getCountInPatientList", async (req, res) => {
  let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
  let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);

  var j = request.jar();
  var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

  if (req.body.module === 'home') {
    var ipCount = `/IPLISTSET/$count`;
  }
  if (req.body.module === 'My_IP_consultations') {
    var ipCount = `/ConsultationSet/$count`;
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
    var ipCount = `/PhyorderNotExecutedSet/$count?$filter=(Typ eq '${req.body.Typ}')`;
  }


  let urlEndpoint = config.apiEndpointEMRInPatient + 'ZAB_EMR_IP_LIST_SRV' + ipCount;
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
      res.json({ message: err });
      logger.log('error',error.message)
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


//#region Lab Reports

router.post("/getLabDocCheckinSet", async (req, res) => {
  
  const urlEndpoint = String.raw`${baseURL}ZAB_EMR_IP_LIST_SRV/DocCheckinSet`;

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
      if (error) {
          res.json(error);
          return console.dir(error);
      }
      else {
          //console.log(body);
          return res.status(response.statusCode).json(body);
      }
  })
});



router.get("/getLabServicesSet/", (req, res) => {
  let mysapSSO2Value = decodeURIComponent(req.cookies["MYSAPSSO2"]);
  let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
  var j = request.jar();
  var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

  const { vkgid  } = req.query;
  
  const urlEndpoint = String.raw`${baseURL}ZAB_EMR_IP_LIST_SRV/LabServicesSet?$filter=(Vkgid eq '${vkgid}')`;
  
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
      res.json({ message: err });
      logger.log('error',error.message)
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
        logger.log('error',`${response.statusCode + '' + body}`)
      }

      if (response.statusCode == 401) {
        return res.status(response.statusCode).json(body);
      } else {
        return res.status(response.statusCode).json(JSON.parse(body));
      }
    }
  });
});


router.post("/createLabServicesSet", async (req, res) => {
  
  const urlEndpoint = String.raw`${baseURL}ZAB_EMR_IP_LIST_SRV/LabListSet `;

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
      if (error) {
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


//#endregion


router.get("/getHospitalCountSet/", (req, res) => {
  let mysapSSO2Value = decodeURIComponent(req.cookies["MYSAPSSO2"]);
  let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
  var j = request.jar();
  var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

  const { type,floor } = req.query;

 
  let floorfilter = '';
  if (floor) {

    let floorFilterarr = [];
    var str_array = floor.split(',');
    for (var i = 0; i < str_array.length; i++) {
      // Trim the excess whitespace.
      let value = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
      if (value) {
        // Add additional code here, such as:
        floorFilterarr.push(` Floor eq '${value}' `);

      }
    }

    if (floorFilterarr.length > 0) {
      floorfilter = `and (${floorFilterarr.join(' or ')})`;
    }

  }

  const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRIPLISTSRV}/HospitalCountSet?$filter=(Typ eq '${type}') ${floorfilter}`;
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
      res.json({ message: err });
      logger.log('error',error.message)
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

router.get("/LDRBirthUnitget/", (req, res) => {
  let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
  let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
  var j = request.jar();
  var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

  const { Einri, Falnr, Lfdbw } = req.query;

  const urlEndpoint = String.raw`${config.apiEndpoint}:${config.apiEndpointPort}${config.apiSAPCatlogEndpoint}${config.apiZABEMRDIALYSISSRV}/LDRBirthUnitSet?$filter=(Einri eq '${Einri}' and Falnr eq '${Falnr}' and Lfdbw eq '${Lfdbw}')`;
console.log(urlEndpoint);
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
          res.json({ message: err });
          logger.log('error',error.message)
          return console.dir(error);
      }
      else {
          res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
          res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
          res.header('Access-Control-Expose-Headers', 'Content-Length');
          res.header('Access-Control-Allow-Credentials', 'true');
          res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
          if (response.statusCode == 401) {

              return res.status(response.statusCode).json(body);
          }
          else {
              return res.status(response.statusCode).json(JSON.parse(body));
          }
      }
  });
});

router.get("/getPatientSet/", (req, res) => {
  let mysapSSO2Value = decodeURIComponent(req.cookies["MYSAPSSO2"]);
  let mySAPSSO2Cookie = "MYSAPSSO2=" + decodeURI(mysapSSO2Value);
  var j = request.jar();
  var cookie = request.cookie("MYSAPSSO2" + "=" + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

  const { patnr,datefrom, dateto, falnr } = req.query;

  let dateFromfilter = '';
  if (datefrom && dateto) {
    dateFromfilter = ` and ( Date ge datetime'${datefrom}' and Date le datetime'${dateto}')`;
  }

  let falnrfilter = '';
  if (falnr) {
    falnrfilter = ` and Falnr eq '${falnr}'`;
  }

  const urlEndpoint = String.raw`${baseURL}${config.apiZABEMRPATORGSRV}/PatientSet?$expand=ToLab,ToRad,ToMed,ToAdm,ToSurg,ToConsult,ToPnote,ToNdoc&$filter=(Patnr  eq '${patnr}' ${falnrfilter} ${dateFromfilter})`;
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
      res.json({ message: err });
      logger.log('error',error.message)
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
router.post("/createObpptSet", async (req, res) => {
  
  const urlEndpoint = String.raw`${baseURL}${config.apiZNOBPPTSRV}/ObpptSet `;

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
      if (error) {
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

router.post("/updateObpptSet", async (req, res) => {
  const urlEndpoint = `${baseURL}${config.apiZNOBPPTSRV}/ObpptSet(Dockey='${req.body.Dockey}')`;

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

router.delete("/deleteObpptSet/:docKey", async (req, res) => {
  const { docKey } = req.params;
  console.log(docKey, "docKey")
  const urlEndpoint = `${baseURL}${config.apiZNOBPPTSRV}/ObpptSet(Dockey='${docKey}')`;

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
          // 'If-Match': `W/"\'${etag}\'"`,
          'sap-client': config.client,
          'Cookie': mySAPSSO2Cookie,
      }
  }, function (error, response, body) {
      console.log(response);
      console.log(JSON.stringify(body));
      if (error) {
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

router.get("/getObpptSet/", (req, res) => {
  let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
  let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
  var j = request.jar();
  var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

  const { docKey } = req.query;

  const urlEndpoint = String.raw`${baseURL}${config.apiZNOBPPTSRV}/ObpptSet?$filter=Dockey eq '${docKey}'`;

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
          res.json({ message: err });
          logger.log('error',error.message)
          return console.dir(error);
      }
      else {
          res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
          res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
          res.header('Access-Control-Expose-Headers', 'Content-Length');
          res.header('Access-Control-Allow-Credentials', 'true');
          res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
          if (response.statusCode == 401) {

              return res.status(response.statusCode).json(body);
          }
          else {
              return res.status(response.statusCode).json(JSON.parse(body));
          }
      }
  });



});
//Obs VTE Anteptm APIs

router.post("/createObantSet", async (req, res) => {
  
  const urlEndpoint = String.raw`${baseURL}${config.apiZNOBANTSRV}/ObantSet `;

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
      if (error) {
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

router.post("/updateObantSet", async (req, res) => {
  const urlEndpoint = `${baseURL}${config.apiZNOBANTSRV}/ObantSet(Dockey='${req.body.Dockey}')`;

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

router.delete("/deleteObantSet/:docKey", async (req, res) => {
  const { docKey } = req.params;
  console.log(docKey, "docKey")
  const urlEndpoint = `${baseURL}${config.apiZNOBANTSRV}/ObantSet(Dockey='${docKey}')`;

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
          // 'If-Match': `W/"\'${etag}\'"`,
          'sap-client': config.client,
          'Cookie': mySAPSSO2Cookie,
      }
  }, function (error, response, body) {
      console.log(response);
      console.log(JSON.stringify(body));
      if (error) {
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

router.get("/getObantSet/", (req, res) => {
  let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
  let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
  var j = request.jar();
  var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

  const { docKey } = req.query;

  const urlEndpoint = String.raw`${baseURL}${config.apiZNOBANTSRV}/ObantSet?$filter=Dockey eq '${docKey}'`;

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
          res.json({ message: err });
          logger.log('error',error.message)
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
router.get("/LDRListSet/", (req, res) => {
  let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
  let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
  var j = request.jar();
  var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

  const { Behperson, FromDate, ToDate } = req.query;
  let urlEndpoint = '';
  if (Behperson == '' && FromDate == '' && ToDate == '') {
    urlEndpoint = String.raw`${config.apiEndpoint}:${config.apiEndpointPort}${config.apiSAPCatlogEndpoint}${config.apiZABEMRDIALYSISSRV}/ListSet?$expand=ToLDRBu,ToPhysician`;
  }else{
    let BehpersonValue = '';
    let FromdateValue = '';
    let TodateValue = '';
    let physicianArr = [];
    let finalPhysicianArr = [];
    if (Behperson !== '') {
      physicianArr = JSON.parse(Behperson);
      if (physicianArr.length > 1) {
        for (let index = 0; index < physicianArr.length; index++) {
          finalPhysicianArr.push(`Behperson eq '${physicianArr[index].Behperson}'`)
          
        }
        finalPhysicianArr.join('or');
        BehpersonValue = '('+ finalPhysicianArr.join(' or ') + ')';
        console.log('BehpersonValueBehpersonValue',BehpersonValue);
      }else{
      for (let index = 0; index < physicianArr.length; index++) {
        BehpersonValue = `Behperson eq '${physicianArr[index].Behperson}'`
        
      }
    }
      
    }
    if (FromDate !== '') {
      if (Behperson !== '') {
        FromdateValue = `and Fromdate eq datetime'${FromDate}'`
      }else{
        FromdateValue = `Fromdate eq datetime'${FromDate}'`
      }
      
    }
    if (ToDate !== '') {
      if (FromDate !== '') {
        TodateValue = `and Todate eq datetime'${ToDate}'`
      } else {
        TodateValue = `Todate eq datetime'${ToDate}'`
      }
      
    }
     urlEndpoint = String.raw`${config.apiEndpoint}:${config.apiEndpointPort}${config.apiSAPCatlogEndpoint}${config.apiZABEMRDIALYSISSRV}/ListSet?$filter=(${BehpersonValue} ${  FromdateValue} ${TodateValue} )&$expand=ToLDRBu,ToPhysician`;
  }
 
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
          res.json({ message: err });
          logger.log('error',error.message)
          return console.dir(error);
      }
      else {
          res.header('Access-Control-Allow-Origin', config.AllowOriginDomain);
          res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
          res.header('Access-Control-Expose-Headers', 'Content-Length');
          res.header('Access-Control-Allow-Credentials', 'true');
          res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,sap-client,Accept, Authorization, Content-Type, X-Requested-With, Range,Access-Control-Allow-Credentials');
          if (response.statusCode == 401) {

              return res.status(response.statusCode).json(body);
          }
          else {
              return res.status(response.statusCode).json(JSON.parse(body));
          }
      }
  });
});
// obs gyn APIS
router.post("/createObsGyn", async (req, res) => {
  
  const urlEndpoint = String.raw`${baseURL}${config.apiZNOBGYPHYSSRV}/ObgyPhysAssesSet `;

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
      if (error) {
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
router.post("/getObsGynData", async (req, res) => {
  
  const urlEndpoint = String.raw`${baseURL}${config.apiZNOBGYPHYSSRV}/ObgyPhysAssesSet?$filter=Einri eq '${req.body.Einri}' and Falnr eq '${req.body.Falnr}'&$expand=TOALLERGIES,TOVITALSIGNS,TODIAGNOSES,TOPHYEXAM `;

  let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
  let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
  
  request({
      method: 'GET',
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
router.post("/updateObsGynDoc", async (req, res) => {
  
  const urlEndpoint = String.raw`${baseURL}${config.apiZNOBGYPHYSSRV}/ObgyPhysAssesSet`;
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
      if (error) {
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
router.post("/deleteObsGynDoc", async (req, res) => {
  const urlEndpoint = `${baseURL}${config.apiZNOBGYPHYSSRV}/ObgyPhysAssesSet(Dockey='${req.body.Dockey}')`;

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
          // 'If-Match': `W/"\'${etag}\'"`,
          'sap-client': config.client,
          'Cookie': mySAPSSO2Cookie,
      }
  }, function (error, response, body) {
      console.log(response);
      console.log(JSON.stringify(body));
      if (error) {
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
router.post("/releaseObsGynDoc", async (req, res) => {
  
  const urlEndpoint = String.raw`${baseURL}${config.apiZNOBGYPHYSSRV}/ObgyPhysAssesSet`;

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
      if (error) {
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
router.post("/getObsGynReleasedPdf", async (req, res) => {
  
  const urlEndpoint = String.raw`${baseURL}${config.apiZNOBGYPHYSSRV}/PDFFileSet('${req.body.Dockey}')`;

  let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
  let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
  
  request({
      method: 'GET',
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

// neo natal APIS
router.post("/createNeoNatalDoc", async (req, res) => {
  
  const urlEndpoint = String.raw`${baseURL}${config.apiZNNEOPNOTESRV}/NeoPNoteSet `;

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
      if (error) {
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
router.post("/getNeoNatalData", async (req, res) => {
  
  const urlEndpoint = String.raw`${baseURL}${config.apiZNNEOPNOTESRV}/NeoPNoteSet?$filter=Dockey eq '${req.body.Dockey}'`;

  let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
  let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
  
  request({
      method: 'GET',
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
router.post("/updateNeoNatalDoc", async (req, res) => {
  
  const urlEndpoint = String.raw`${baseURL}${config.apiZNNEOPNOTESRV}/NeoPNoteSet(Dockey='${req.body.Dockey}')`;
  let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
  let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
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
      if (error) {
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
router.post("/deleteNeoNatalDoc", async (req, res) => {
  const urlEndpoint = `${baseURL}${config.apiZNNEOPNOTESRV}/NeoPNoteSet(Dockey='${req.body.Dockey}')`;

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
          // 'If-Match': `W/"\'${etag}\'"`,
          'sap-client': config.client,
          'Cookie': mySAPSSO2Cookie,
      }
  }, function (error, response, body) {
      console.log(response);
      console.log(JSON.stringify(body));
      if (error) {
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
router.post("/releaseNeoNatalDoc", async (req, res) => {
  
  const urlEndpoint = String.raw`${baseURL}${config.apiZNNEOPNOTESRV}/NeoPNoteSet(Dockey='${req.body.Dockey}')`;

  let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
  let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
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
      if (error) {
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
router.post("/getNeoNatalReleasedPdf", async (req, res) => {
  
  const urlEndpoint = String.raw`${baseURL}${config.apiZNNEOPNOTESRV}/PDFFileSet('${req.body.Dockey}')`;

  let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
  let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
  
  request({
      method: 'GET',
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
// 
// neo natal medical report APIS
router.post("/createNeoNatalMRDoc", async (req, res) => {
  
  const urlEndpoint = String.raw`${baseURL}${config.apiZNNOENATMEDREPSRV}/NoenatMedRepSet `;

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
      if (error) {
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
router.post("/getNeoNatalMRData", async (req, res) => {
  
  const urlEndpoint = String.raw`${baseURL}${config.apiZNNOENATMEDREPSRV}/NoenatMedRepSet?$filter=Dockey eq '${req.body.Dockey}'`;

  let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
  let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
  
  request({
      method: 'GET',
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
router.post("/updateNeoNatalMRDoc", async (req, res) => {
  
  const urlEndpoint = String.raw`${baseURL}${config.apiZNNOENATMEDREPSRV}/NoenatMedRepSet(Dockey='${req.body.Dockey}')`;
  let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
  let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
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
      if (error) {
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
router.post("/deleteNeoNatalMRDoc", async (req, res) => {
  const urlEndpoint = `${baseURL}${config.apiZNNOENATMEDREPSRV}/NoenatMedRepSet(Dockey='${req.body.Dockey}')`;

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
          // 'If-Match': `W/"\'${etag}\'"`,
          'sap-client': config.client,
          'Cookie': mySAPSSO2Cookie,
      }
  }, function (error, response, body) {
      console.log(response);
      console.log(JSON.stringify(body));
      if (error) {
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
router.post("/releaseNeoNatalMRDoc", async (req, res) => {
  
  const urlEndpoint = String.raw`${baseURL}${config.apiZNNOENATMEDREPSRV}/NoenatMedRepSet(Dockey='${req.body.Dockey}')`;

  let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
  let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
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
      if (error) {
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
router.post("/getNeoNatalMRReleasedPdf", async (req, res) => {
  
  const urlEndpoint = String.raw`${baseURL}${config.apiZNNOENATMEDREPSRV}/PDFFileSet('${req.body.Dockey}')`;

  let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
  let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
  
  request({
      method: 'GET',
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

// physician report APIS
router.post("/getPhysicianAssessDoc", async (req, res) => {
  
  const urlEndpoint = String.raw`${baseURL}${config.apiZNPHYSICIANASSESSRV}/PhyAssesSet?$filter=Dockey eq '${req.body.Dockey}' &$expand=TOALLERGIES,TOVITALSIGNS,TOMEDICATION,TOFAMILYHIST,TOPMEDCOND,TOPSURGERIHIST,TOPHYEXAM,TOOBSEXAM,TODIAGNOSES,TORAD,TOLAB`;

  let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
  let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
  
  request({
      method: 'GET',
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
// physician create form
router.post("/createPhysicianAssessDoc", async (req, res) => {
  
  const urlEndpoint = String.raw`${baseURL}${config.apiZNPHYSICIANASSESSRV}/PhyAssesSet `;

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
      if (error) {
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
// physician report APIS
router.post("/getPhysicianAssessDoc", async (req, res) => {
  
  const urlEndpoint = String.raw`${baseURL}${config.apiZNPHYSICIANASSESSRV}/PhyAssesSet?$filter=Dockey eq '${req.body.Dockey}' &$expand=TOALLERGIES,TOVITALSIGNS,TOMEDICATION,TOFAMILYHIST,TOPMEDCOND,TOPSURGERIHIST,TOPHYEXAM,TOOBSEXAM,TODIAGNOSES,TORAD,TOLAB`;

  let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
  let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
  
  request({
      method: 'GET',
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
// physician create form
router.post("/createPhysicianAssessDoc", async (req, res) => {
  
  const urlEndpoint = String.raw`${baseURL}${config.apiZNPHYSICIANASSESSRV}/PhyAssesSet `;

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
      if (error) {
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
// physician update form
router.post("/updatePhysicianAssessDoc", async (req, res) => {
  
  const urlEndpoint = String.raw`${baseURL}${config.apiZNPHYSICIANASSESSRV}/PhyAssesSet`;

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
      if (error) {
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
// physician release form
router.post("/releasePhysicianAssessDoc", async (req, res) => {
  
  const urlEndpoint = String.raw`${baseURL}${config.apiZNPHYSICIANASSESSRV}/PhyAssesSet`;

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
      if (error) {
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
// physician delete form
router.post("/deletePhysicianAssessDoc", async (req, res) => {
  
  const urlEndpoint = String.raw`${baseURL}${config.apiZNPHYSICIANASSESSRV}/PhyAssesSet(Dockey='${req.body.Dockey}')`;

  let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
  let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
  
  request({
      method: 'DELETE',
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
router.post("/getPhysicianAssessDocPDF", async (req, res) => {
  
  const urlEndpoint = String.raw`${baseURL}${config.apiZNPHYSICIANASSESSRV}/PDFFileSet('${req.body.Dockey}')`;

  let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
  let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
  
  request({
      method: 'GET',
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
// 
//#region Transfer Assessment start

//Transfer get Doc
router.get("/getTransferAssessDoc/", (req, res) => {
  let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
  let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
  var j = request.jar();
  var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

  const { docKey } = req.query;
  const urlEndpoint = String.raw`${baseURL}${config.apiZNTRANSFERASSESSRV}/TransferAssSet?$filter=Dockey eq '${docKey}'&$expand=TOVITALSIGNS,TOMED,TOPROCE,TOSCALE,TOEXAM`;

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
          res.json({ message: err });
          logger.log('error',error.message)
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

//Transfer get scale list
router.get("/getTransferAssessDoc/", (req, res) => {
  let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
  let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
  var j = request.jar();
  var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

  const { docKey } = req.query;
  const urlEndpoint = String.raw`${baseURL}${config.apiZNTRANSFERASSESSRV}/TransferAssSet?$filter=Dockey eq '${docKey}'&$expand=TOVITALSIGNS,TOMED,TOPROCE,TOSCALE,TOEXAM`;

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
          res.json({ message: err });
          logger.log('error',error.message)
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

// Transfer Assesst create form
router.post("/createTransferAssessDoc", async (req, res) => {
  //-http://ACHDEVEMR01.ach.jo:8000/sap/opu/odata/sap/ZN_TRANSFER_ASSES_SRV/TransferAssSet
  const urlEndpoint = String.raw`${baseURL}${config.apiZNTRANSFERASSESSRV}/TransferAssSet `;

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
      if (error) {
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
//update
router.post("/updateTransferDoc", async (req, res) => {
  
  const urlEndpoint = String.raw`${baseURL}${config.apiZNTRANSFERASSESSRV}/TransferAssSet`

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
      if (error) {
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



//  delete form
router.post("/deleteTransferDoc", async (req, res) => {
  
  const urlEndpoint = String.raw`${baseURL}${config.apiZNTRANSFERASSESSRV}/TransferAssSet(Dockey='${req.body.Dockey}')`;

  let mysapSSO2Value = decodeURI(req.cookies['MYSAPSSO2']);
  let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
  
  request({
      method: 'DELETE',
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
//#endregion Transfer Assessment end
module.exports = router;
