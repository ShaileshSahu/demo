
const mongoose = require('mongoose');


/**
 * This model used for the creation of notes
 */
const schema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },

    note: {
        type: String,
        min: 3,
        required: true,
        lowercase: true,
    },

    description: {
        type: String,
        required: false
    },

   attachements: [{
       type: {
           type: Number,
           enum: [1,2,3] // 1: jpg 2: png and 3: pdf
       },
       url: {
           type: String
       }
   }],

    status: {
        type: Boolean,
        default: true
    }
    
},
    {
        timestamps: true
    }
);

schema.index({ note: 1,  _id: 1 });
exports.notes = mongoose.model('notes', schema);