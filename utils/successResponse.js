module.exports = (statusCode, status, data, res) => {
  res.status(statusCode).send({
    status: status,
    data: data,
  });
};
