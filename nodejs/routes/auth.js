// Middleware to authenticate the user

// Required means user needed to login before accessing the API
exports.required = (req, res, next) =>
{
  if (!req.isAuthenticated())
    return res.status(401).send(false);
  else
    return next();
};

/* Optional means user does not need to login before accessing the API,
   but cannot access the API after logged in (for example sign in page) */
exports.optional = (req, res, next) =>
{
  if (req.isAuthenticated())
    return res.status(401).send(false);
  else
    return next();
};

// Only customer are allowed to access the API
exports.customer = (req, res, next) =>
{
  if (req.user.status != 'C')
    return res.status(401).send(false);
  else
    return next();
};

// Only service are allowed to access the API
exports.service = (req, res, next) =>
{
  if (req.user.status != 'S')
    return res.status(401).send(false);
  else
    return next();
};
