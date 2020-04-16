exports.required = (req, res, next) =>
{
  if (!req.isAuthenticated())
    return res.status(401).send(false);
  else
    return next();
};

exports.optional = (req, res, next) =>
{
  if (req.isAuthenticated())
    return res.status(401).send(false);
  else
    return next();
};

exports.customer = (req, res, next) =>
{
  if (req.user.status != 'C')
    return res.status(401).send(false);
  else
    return next();
};

exports.service = (req, res, next) =>
{
  if (req.user.status != 'S')
    return res.status(401).send(false);
  else
    return next();
};
