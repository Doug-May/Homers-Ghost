module.exports = function validateInput(data) {

    function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    let errors = {};

    if (data.userName.length < 2 || data.userName.length > 16) {
        errors.userName = 'User name must be between 2 and 16 characters';
    }

    if (data.userName == "" || data.userName === null || data.userName === undefined) {
        errors.userName = "User name is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};