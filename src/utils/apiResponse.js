// Define a class named ApiResponse
class ApiResponse {
    // The constructor method is called when a new instance of ApiResponse is created
    constructor(statusCode, data, message = "Success") {
        // Initialize the statusCode property with the value passed to the constructor
        this.statusCode = statusCode;
        // Initialize the data property with the value passed to the constructor
        this.data = data;
        // Initialize the message property with the value passed to the constructor, or "Success" if no value is provided
        this.message = message;
        // Initialize the success property to true if statusCode is less than 400, otherwise false
        this.success = statusCode < 400;
    }
}

// Export the ApiResponse class so it can be imported and used in other files
export { ApiResponse }