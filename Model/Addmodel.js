

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    Name: {
        type: String,
    },
    Type: {
        type: String,
    },
    OpeningBalance:{
        type:Number,
    },
    CreditAmount: {
        type: Number,
    },
    DebitAmount: {
        type: Number,
    },
    Balance: {
        type: Number,
    },
    CreditReason: {
        type: String,
    },
    DebitReason: {
        type: String,
    },
    TransactionDetails: {
        type: String,
    },
   
    AttachFile: {
        base64: {
            type: String,
        },
        name: {
            type: String,
        }
    },
    Description: {
        type: String,
    },
    Date: {
        type: String,
        
    },
});

const AddDetail = mongoose.model('AddDetail', schema);

module.exports = AddDetail;
