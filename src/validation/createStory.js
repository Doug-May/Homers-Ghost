module.exports = function validateInput(data) {

    function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    let errors = {};

    if (data.storyTitle.length < 2 || data.storyTitle.length > 16) {
        errors.storyTitle = 'Story name must be between 2 and 16 characters';
    }

    if (data.storyTitle == "" || data.storyTitle === null || data.storyTitle === undefined) {
        errors.storyTitle = "Story name is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};