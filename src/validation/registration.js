module.exports = function validateInput(data) {

    function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    let errors = {};

    if (data.userName.length < 2 || data.userName.length > 10) {
        errors.userName = 'Username must be between 2 and 10 characters';
    }

    if (data.userName === "" || data.userName === null || data.userName === undefined) {
        errors.userName = "Username is required";
    }

    if (data.email === "" || data.email === null || data.email === undefined) {
        errors.email = "Email is required";
    }

    if (data.password === "" || data.password === null || data.password === undefined) {
        errors.password = "Password is required";
    }

    if (data.password !== data.password2) {
        errors.password2 = "Passwords must match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};