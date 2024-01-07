const log = require("../logger/log");

const validateRequest = (req, res, next) => {
  log.info("Validating request...");
  log.info(req.method);
  setheader(req,res);             // iin order to handle browser CORS policy
  if (req.method === 'GET') {
    next(); // Allow GET requests to proceed
  } else if (req.method === 'POST') {
    const contentType = req.headers['content-type'];

    if (contentType !== 'application/json') {
      log.error("Content-Type must be application/json");
      return res.status(400).json({ error: 'Content-Type must be application/json' });
    }

    const { status, title, date } = req.body;

    if (!((('status' in req.body && typeof req.body.status === 'boolean') ) && title)) {  //because interpreter evalute value which is boolean not presence of value;
      log.error("Required parameters are missing");
      return res.status(400).json({ error: "Required parameters are missing" });
    }

    if (date && isNaN(Date.parse(String(date)))) {
      log.error("Invalid date format");
      return res.status(400).json({ error: "Invalid date format" });
    }

    log.info("Request validated successfully");
    next();
  } else {
    next();
  }
};

module.exports = validateRequest;
function setheader(req,res)
{
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST,PUT,DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
}