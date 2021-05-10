// Get 'Home' page
const homeList = (req, res) => {
    res.render("index", {title: "Home"});
};

// Get 'Location Info' page
const locationInfo = (req, res) => {
    res.render("index", {title: "Location Info"});
};

// Get 'Add Review' page
const addReview = (req, res) => {
    res.render("index", {title: "Add Review"});
};

module.exports = {
    homeList,
    locationInfo,
    addReview
};