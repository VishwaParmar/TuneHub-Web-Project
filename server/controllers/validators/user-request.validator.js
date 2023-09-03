// Author: Kainat Khan
// Date: July 24, 2023
exports.validateNewUserRequestBody = function (newUserRequestBody) {
    let validated = true;

    if (!('firstName' in newUserRequestBody) || !('email' in newUserRequestBody)) {
        validated = false;
    }

    return validated;
}
