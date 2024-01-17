const CustomAPIError = require(`./custom-error`);
const BadRequestError = require(`./bad-request`);
const UnauthenticatedError = request(`./unauthenticated.js`);

module.exports = {
  CustomAPIError,
  BadRequestError,
  UnauthenticatedError,
};
