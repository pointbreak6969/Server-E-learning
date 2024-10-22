/**
 * Custom error class for API errors.
 * Extends the built-in Error class.
 */
class ApiError extends Error {
  /**
   * Constructor for ApiError.
   * @param {number} statusCode - HTTP status code of the error.
   * @param {string} [message="Something went wrong"] - Error message.
   * @param {Array} [errors=[]] - Additional error details.
   * @param {string} [stack=""] - Stack trace of the error.
   */
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message); // Call the parent class constructor with the message
    this.statusCode = statusCode; // HTTP status code
    this.data = null; // Placeholder for additional data
    this.message = message; // Error message
    this.success = false; // Indicates the operation was not successful
    this.errors = errors; // Additional error details
    if (stack) {
      this.stack = stack; // Use provided stack trace if available
    } else {
      Error.captureStackTrace(this, this.constructor); // Capture stack trace
    }
  }
}

export { ApiError };
