// utils/upstream.js
const logger = require('./logger');

/**
 * Parse an upstream SAP body without ever throwing.
 *
 * SAP does not always answer with JSON: an ICM/Web Dispatcher error page, a
 * gateway timeout, or an HTML logon page all come back as non-JSON. These
 * bodies are read inside `request`/`axios` callbacks, which run outside any
 * Express handler, so a raw `JSON.parse` throw becomes an uncaught exception
 * and takes the whole process down with every concurrent clinical session.
 *
 * Routes that set `json: true` already receive an object; those are passed
 * through untouched.
 */
function parseUpstreamBody(body) {
  if (typeof body !== 'string') {
    return body;
  }

  try {
    return JSON.parse(body);
  } catch (parseError) {
    return body;
  }
}

/**
 * Respond to a transport-level failure, meaning SAP was never reached at all
 * (DNS failure, connection refused, TLS error, timeout).
 *
 * This must be a 5xx, not the Express default 200: on 200 the Angular client
 * routes the response to its success handler and the UI shows a silent empty
 * state instead of an error, which on a save looks like the save succeeded.
 *
 * The upstream error object never goes into the response body. For `request`
 * it carries the internal SAP host and port; for `axios` it carries
 * `config.headers`, including the MYSAPSSO2 session cookie. Detail stays in
 * the server log only.
 */
function sendUpstreamFailure(res, error, file) {
  logger.log(
    'error',
    `Upstream request failed\nMessage: ${error && error.message}\nCode: ${error && error.code}\nFile Name:${file}`
  );

  return res.status(502).json({
    message: 'Upstream service unavailable',
    code: 'UPSTREAM_UNAVAILABLE'
  });
}

module.exports = { parseUpstreamBody, sendUpstreamFailure };
