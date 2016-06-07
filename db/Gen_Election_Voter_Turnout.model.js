var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stringOpts = { type: String, required: false, sparse: true },
    numOpts = { type: Number, required: false, sparse: true }

var GE_Turnout = new Schema({
    Year: numOpts,
    "ICPSR State Code": numOpts,
    "Alphanumeric State Code": numOpts,
    "State": stringOpts,
    "VEP Total Ballots Counted": numOpts,
    "VAP Highest Office": numOpts,
    "Total Ballots Counted": numOpts,
    "Highest Office": numOpts,
    "Voting-Eligible Population (VEP)": numOpts,
    "Voting-Age Population (VAP)": numOpts,
    "% Non-citizen": numOpts,
    "Prison": numOpts,
    "Probation": numOpts,
    "Parole": numOpts,
    "Total Ineligible Felon": numOpts,
    "Overseas Eligible": Schema.Types.Mixed
});


// MongoDB adds an 's' to Model name to create the database name.
// "GE_turnouts" is the name of the entire Collection
// "GE_Turnout" is the name of the Model
module.exports = mongoose.model('GE_Turnout', GE_Turnout);
