# API Documentation

Welcome to the API documentation for our motivational quote and lorem ipsum text generator API.

Base URL: https://demo.xeven.workers.dev

## Endpoints

### /

Method: GET

Description: Returns a welcome message with instructions on how to use the API.

Response: Hello Guyss! go to /t to use the API

### /t

Method: GET

Description: Returns a random motivational quote.

Response: A JSON object containing a random motivational quote.

### /lorem

Method: GET

Description: Returns a random lorem ipsum text of a specified length.

Query Parameters:

l: The length of the lorem ipsum text in words (default: 50)

Response: A JSON object containing a random lorem ipsum text of the specified length.

### Error Handling

If an endpoint is not found, the API will return a 404 error with a JSON response containing the message "Not Found" and a status code of 404.

### CORS

This API supports CORS (Cross-Origin Resource Sharing) to allow requests from different origins.

### Note

This API uses AI models to generate responses. Please be aware that the responses may not always be accurate or suitable for all audiences.
