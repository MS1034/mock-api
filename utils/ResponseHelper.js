function createResponse({ status, statusCode, path, message, result }) {
    return {
        status,
        statusCode,
        path,
        message,
        result,
        timestamp: new Date().toISOString(),
    };
}

export default createResponse;