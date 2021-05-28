const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    userEmail: {
        type: String,
        required: true,
    },
    loginSuccess: {
        type: Boolean,
        required: true
    },
    loginErrors: String,
    // active: Boolean, needa new service called logout
    attempts: Number,
    sessionDuration: Number
})

auditSchema.methods.addLoginErrors = function(loginErrors){
    if(loginErrors){
        this.loginErrors = loginErrors;
    }
}

mongoose.model("Audit", auditSchema);