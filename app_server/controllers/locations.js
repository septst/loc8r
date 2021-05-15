const request = require('request');
const apiOptionsBuilder = require('./api-request').apiOptionsBuilder;
const baseController = require('./base-controller');

const formatDistance = (distance) => {
  let thisDistance = 0;
  let unit = 'm';

  if (distance > 1000) {                                        
    thisDistance = parseFloat(distance / 1000).toFixed(1);      
    unit = 'km';                                                
  } else {                                                      
    thisDistance = Math.floor(distance);                        
  };
  return thisDistance + unit;
};

const renderHomePage = (req, res, responseBody) => {

  let message = null;
  if(!(responseBody instanceof Array)){
    message = "API lookup error";
    responseBody = [];
  }else if(!responseBody.length){
    message = "No places found nearby";
  }

  res.render("locations-list", {
    title: 'Loc8r - find a place to work with wifi',
    pageHeader: {
        title: 'Loc8r',
        strapline: 'Find places to work with wifi near you!'
    },
    sidebar: 'Looking for wifi and a seat? Loc8r helps you find places ' +  
            'to work when out and about. Perhaps with coffee, cake or a pint?'+          
            'Let Loc8r help you find the place you are looking for.',
    locations: responseBody,
    message
  });
};

// Get 'Home' page
const homeList = (req, res) => {
  let qsParams = {lng:-0.018520, lat:51.505630, maxDistance:20};
  let requestOptions = new apiOptionsBuilder()
                   .addPath('/api/locations')
                   .addMethod('GET')
                   .addQueryStringParams(qsParams)
                   .build();
  request(requestOptions,
    (err, {statusCode}, body) => {
      let data = [];
      if(statusCode === 200 && body.length){
        data = body.map( locations => {
          locations.distance = formatDistance(locations.distance);
          return locations;
        });
      };
      renderHomePage(req, res, data);
    });
};

const renderDetailsPage = (req, res, location) =>{
  res.render('location-info', {
    title: location.name,
    pageHeader:{
      title: location.name
    },
    sidebar: {
      context: 'is on Loc8r because it has accessible wifi and '+
      'space to sit down with your laptop and get some work done.',
      callToAction: 'If you\'ve been and you like it - or if you '+
      'don\'t - please leave a review to help other people just like you.'
    },
    location
  });
}

const getLocationInfo = (req, res, callback) =>{
  let requestOptions = new apiOptionsBuilder()
                   .addPath(`/api/locations/${req.params.locationId}`)
                   .addMethod('GET')
                   .build();
                   
  request(requestOptions,
    (err, {statusCode}, body) => {
      if(statusCode === 200){
        const data = body;
        data.coords = {
          lng: body.coords[0],
          lat: body.coords[1]
        };
        callback(req, res, data);
      }else{
        baseController.showError(req, res, statusCode);        
      }
    });
};

// Get 'Location Info' page
const locationInfo = function(req, res){
  getLocationInfo(req, res, 
    (req, res, responseData) => renderDetailsPage(req, res, responseData));
};

const renderReviewForm  = (req, res, {name}) =>{
  res.render('location-review-form', {
    title: `Review ${name} on Loc8r`,                        
    pageHeader: { title: `Review ${name}`},
    error: req.query.err
  });
};

const doAddReview = function(req, res){
    
  const locationId = req.params.locationId;
  const postData = {
    author: req.body.name,
    rating: parseInt(req.body.rating, 10),
    reviewText: req.body.review
  };
  let requestOptions = new apiOptionsBuilder()
                   .addPath(`/api/locations/${req.params.locationId}/reviews`)
                   .addMethod('POST')
                   .addData(postData)
                   .build();
  console.log("opt =>",requestOptions);

  if (!postData.author || !postData.rating || !postData.reviewText) {
    res.redirect(`/location/${locationid}/review/new?err=val`);
  } else {
    request(requestOptions,
      (err, {statusCode}, {name}) => {
        console.log("err=>",statusCode);
        if(statusCode === 201){
          res.redirect(`/location/${locationid}`); 
        } else if (statusCode === 400 && name && name === 'ValidationError') {
          res.redirect(`/location/${locationid}/review/new?err=val`);
        } else{
          baseController.showError(req, res, err);
        };
    });
  }
};

// Get 'Add Review' page
const addReview = (req, res) => {
  getLocationInfo(req, res,
    (req, res, responseData) => renderReviewForm(req, res, responseData)
  );
};

module.exports = {
    homeList,
    locationInfo,
    addReview,
    doAddReview
};