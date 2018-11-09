module.exports = function validateInput(currentStory) {
    let errors = {
        story: false,
        notes: false
    };

    if (currentStory.story.length > 70005) {
        errors.story = true;
    }

    if (currentStory.notes.length > 10005) {
        errors.notes = true;
    }

    return errors;
};