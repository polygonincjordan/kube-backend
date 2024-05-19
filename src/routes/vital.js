const express = require("express");
const router = express.Router();
const axios = require("axios");
const request = require('request');
const config = require('../../config/env.config');
const logger = require('../../utils/logger');
const baseURL = `${config.apiEndpoint}:${config.apiEndpointPort}${config.apiSAPEndpoint}`;

const auth = {
  username: "rakshitd",
  password: "idha@123",
};

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Vital Middleware -> Time: ", Date.now());
  next();
});

router.get("/getByKey", (req, res) => {

  const { catKey, catItemKey, patient = '', institution = '' } = req.query;
  let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
  let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
  const urlEndpoint = `${baseURL}${config.apiVitalEndpoint}/VitalCatSet(CatKey='${catKey}',CatItemKey='${catItemKey}',Patient='${patient}',Institution='${institution}')?sap-statistics=true&sap-client=${config.client}`;

  axios.get(urlEndpoint, {
    headers: {
      Cookie: mySAPSSO2Cookie
    }
  })
    .then((response) => res.status(200).json(response.data))
    .catch((err) => res.status(500).json({ message: err }));

  return res;
});

router.get("/getByFilters", (req, res) => {

  const { catKey, catItemKeys = null, patient = '', institution } = req.query;
  let vilatsFilters = ``;
  const _catItemKeys = JSON.parse(catItemKeys);
  if (Array.isArray(_catItemKeys)) {
    _catItemKeys.forEach((item, i) => {
      vilatsFilters += `${i == 0 ? `` : ` or `}CatItemKey eq '${item}'`;
    });
    vilatsFilters = `(${vilatsFilters})`;
  }
  const catItemKeysFilter = vilatsFilters ? `and ${vilatsFilters}` : ``;

  const filter = `$filter=Institution eq '${institution}' and Patient eq '${patient}' and CatKey eq '${catKey}' ${catItemKeysFilter}`;

  const urlEndpoint = `${baseURL}${config.apiVitalEndpoint}/VitalCatSet?${filter}&sap-statistics=true&sap-client=${config.client}`;

  // axios.get(urlEndpoint, { 
  //     headers:{
  //        Cookie: mySAPSSO2Cookie
  //     }
  // })
  //    .then((response) => res.status(200).json(response.data))
  //    .catch((err) => res.status(500).json({ message: err }));






  let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
  let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
  var j = request.jar();
  var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

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
  return res;
});

// router.get("/getByDates", (req, res) => {
//   let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
//   let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
//   const { catKey, catItemKeys = null, patient = '', institution, from, to } = req.query;

//   let vitalsFilters = ``;

//   const _catItemKeys = JSON.parse(catItemKeys);
//   if (Array.isArray(_catItemKeys)) {
//     _catItemKeys.forEach((item, i) => {
//       vitalsFilters += `${i == 0 ? `` : ` or `}CatItemKey eq '${item}'`;
//     });
//     vitalsFilters = `(${vitalsFilters})`;
//   }

//   const catItemKeysFilter = vitalsFilters ? `and ${vitalsFilters}` : ``;

//   const datesFilter = `and ValDateTimeUTC gt ${from} and ValDateTimeUTC lt ${to}`;

//   const filter = `$filter=Institution eq '${institution}' and Patient eq '${patient}' and CatKey eq '${catKey}' ${catItemKeysFilter} ${datesFilter}`;

//   const urlEndpoint = `${baseURL}${config.apiVitalValueEndpoint}/VitalValSet?${filter}&sap-statistics=true&sap-client=${config.client}`;

//   axios.get(urlEndpoint, {
//     headers: {
//       Cookie: mySAPSSO2Cookie
//     }
//   })
//     .then((response) => res.status(200).json(response.data))
//     .catch((err) => res.status(500).json({ message: err }));

//   return res;
// });


router.get("/getByDates/", (req, res) => {
  let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
  let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
  var j = request.jar();
  var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });
  const { Einri, Falnr, Patnr, Lfdnr } = req.query;
  // const { catKey, catItemKeys = null, patient = '', institution, from, to } = req.query;
  // const _catItemKeys = JSON.parse(catItemKeys);
  // if (Array.isArray(_catItemKeys)) {
  //   _catItemKeys.forEach((item, i) => {
  //     vitalsFilters += `${i == 0 ? `` : ` or `}CatItemKey eq '${item}'`;
  //   });
  //   vitalsFilters = `(${vitalsFilters})`;
  // }
  // const catItemKeysFilter = vitalsFilters ? `and ${vitalsFilters}` : ``;
  // const datesFilter = `and ValDateTimeUTC gt ${from} and ValDateTimeUTC lt ${to}`;
  const urlEndpoint = `${config.apiEndpointEMRInPatient}${config.apiZNVITALSIGNSSRV}/VitalSignSet?$filter=Einri eq '${Einri}' and Falnr eq '${Falnr}' and Patnr eq '${Patnr}' and Lfdnr eq '${Lfdnr}'&$expand=TOITEM&$format=json`;

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
