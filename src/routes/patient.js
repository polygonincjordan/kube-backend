const request = require('request');
const express = require("express");
const router = express.Router();
const axios = require("axios");
const config = require('../../config/env.config');

const baseURL = `${config.apiEndpoint}:${config.apiEndpointPort}${config.apiSAPEndpoint}${config.apiPatientEndpoint}`;


//const baseURL = "http://achemr01.ach.jo:8000/sap/opu/odata4/sap/znfhir/default/sap/znfhir_encounter_service/0001";

const auth = {
  username: "rakshitd",
  password: "idha@123",
};

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Patient Middleware Time: ", Date.now());
  next();
});

router.get("/getDataPatient/:encounterId", (req, res) => {

  let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
  let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
  var j = request.jar();
  var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
  j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });

  const { encounterId } = req.params;
  const options = {
      url:`${baseURL}/EncounterSet('${encounterId}')?$expand=episodeOfCare($expand=*),participant/individual,subject,location&sap-client=${config.client}`,
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
          res.json({ message: err });
          return console.dir(error);
      }
      else {
          //res.header('Access-Control-Allow-Origin', 'http://abdaliwebserver.ach.jo:8090');
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

router.get("/getDataConsultations/:encounterId", (req, res) => {
  const { encounterId } = req.params;

  const urlEndpoint = `${baseURL}/EncounterSet('${encounterId}')?$expand=visitNote&sap-client=${config.client}`;

    let mysapSSO2Value = decodeURIComponent(req.cookies['MYSAPSSO2']);
    let mySAPSSO2Cookie = 'MYSAPSSO2=' + decodeURI(mysapSSO2Value);
      var j = request.jar();
      var cookie = request.cookie('MYSAPSSO2' + '=' + mysapSSO2Value);
      j.setCookie(cookie, config.apiEndpoint, { domain: config.apiDomain });
    
      const options = {
          url:`${urlEndpoint}`,
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
              res.json({ message: err });
              return console.dir(error);
          }
          else {
              //res.header('Access-Control-Allow-Origin', 'http://abdaliwebserver.ach.jo:8090');
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

module.exports = router;
