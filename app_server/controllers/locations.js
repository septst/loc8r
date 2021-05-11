// Get 'Home' page
const homeList = (req, res) => {
    res.render("locations-list", {title: "Home"});
};

// Get 'Location Info' page
const locationInfo = (req, res) => {
    res.render("location-info", {title: "Location Info"});
};

// Get 'Add Review' page
const addReview = (req, res) => {
    res.render("location-review-form", {title: "Add Review"});
};

module.exports = {
    homeList,
    locationInfo,
    addReview
};