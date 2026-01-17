class ExpressError extends Error {
  constructor(statusCode, message) {
    super(message);         // pass message to Error constructor
    this.statusCode = statusCode;
    this.message = message; // assign the message to this.message
    Error.captureStackTrace(this, this.constructor); // optional but good practice
  }
}

module.exports = ExpressError;
