// Get 'Home' page
const homeList = (req, res) => {
    res.render("locations-list", {
        title: 'Loc8r - find a place to work with wifi',
        pageHeader: {
            title: 'Loc8r',
            strapline: 'Find places to work with wifi near you!'
        },
        sidebar: 'Looking for wifi and a seat? Loc8r helps you find places ' +  
                'to work when out and about. Perhaps with coffee, cake or a pint?'+          
                'Let Loc8r help you find the place you are looking for.',
        locations:[{                                         
            name: 'Starcups',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 3,
            facilities: ['Hot drinks', 'Food', 'Premium wifi'],
            distance: '100m'
          },{
            name: 'Cafe Hero',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 4,
            facilities: ['Hot drinks', 'Food', 'Premium wifi'],
            distance: '200m'
          },{
            name: 'Burger Queen',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 2,
            facilities: ['Food', 'Premium wifi'],
            distance: '250m'
          }]
    });
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