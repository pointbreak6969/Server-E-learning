// Define a function named 'asyncHandler' that takes a single argument 'requestHandler'.
// 'requestHandler' is expected to be an asynchronous function (returns a promise).
const asyncHandler = (requestHandler) => {
    // Return a new function that takes 'req', 'res', and 'next' as arguments.
    // These are the standard parameters for Express middleware functions.
    return (req, res, next) => {
        // Call the 'requestHandler' function with 'req', 'res', and 'next'.
        // Wrap the call in 'Promise.resolve' to ensure it returns a promise.
        // If the promise is rejected (an error occurs), catch the error and pass it to 'next'.
        // 'next' is a function that passes control to the next middleware in the stack.
        Promise.resolve(requestHandler(req, res, next)).catch(err => next(err));
    };
};

// Export the 'asyncHandler' function so it can be imported and used in other files.
export { asyncHandler };