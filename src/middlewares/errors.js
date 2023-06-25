export const errorHandler = (error, _req, res, _next) => {
  const status = error.status || 500;
  res.status(status).send({
    msg: `[Error]: ${error.message}`,
  });
};
