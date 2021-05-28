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
    LoginSuccess: {
        type: Boolean,
        required: true
    },
    Errors: String
})

mongoose.model("Aduit", auditSchema);