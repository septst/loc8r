const { json } = require("express");

class apiOptionsBuilder{

    constructor(){
        this.apiOptions = {};
        this.apiOptions.json = {};
        this.apiOptions.method = "GET";
    }

    server = process.env.NODE_ENV === 'production' ? 
        'https://ps-loc8r.herokuapp.com':
        'http://localhost:3000';
    
    // server = 'http://localhost:3000';
   
    addPath(path){
        this.apiOptions.url = `${this.server}${path}`;
        return this;
    }

    addMethod(method){
        let allowedMethods = ['GET', 'PUT', 'POST', 'DELETE'];
        if(!allowedMethods.includes(method)){
            throw new Error('The request method is not valid');
        }
        this.apiOptions.method = method;
        return this;
    }

    addData(data){
        this.apiOptions.json = data;
        return this;
    }

    addQueryStringParams(qsParams){
        this.apiOptions.qs = qsParams
        return this;
    }

    build(){
        return this.apiOptions;
    }
};

module.exports = {
    apiOptionsBuilder
};