const express = require("express");
const app = express();

const cors = require("cors");
const cookieParser = require('cookie-parser')

const routes = require('./src/routes');
const config = require('./config/env.config');

///** Cors settings and Header Settings **/
const allowlist = [config.AllowOriginDomain];

const corsOptionsDelegate = (req, callback) => {
  let corsOptions;

  let isDomainAllowed = allowlist.indexOf(req.header("Origin")) !== -1;

  if (isDomainAllowed) {
    // Enable CORS for this request
    corsOptions = { credentials: true, origin: true };
  } else {
    // Disable CORS for this request
    corsOptions = { credentials: false, origin: false };
  }
  callback(null, corsOptions);
};

// fixing "413 Request Entity Too Large" errors
app.use(express.json({limit: "50mb", extended: true}))
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}))

app.use(cors(corsOptionsDelegate));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Expose-Headers", "Content-Length");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Origin, sap-client, set-cookie, Accept, Authorization, Content-Type, X-Requested-With, Range, MYSAPSSO2, spnego, Access-Control-Allow-Credentials, XSRF-Token"
  );
  if (req.method === "OPTIONS") {
    return res.send(200);
  } else {
    return next();
  }
});

app.use(express.json());
app.use(cookieParser());

app.use("/", routes);

///** Listening **/
const port = config.port;
app.listen(port, () => {
  console.log("Listening on port " + port);
});
