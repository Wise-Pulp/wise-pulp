const Authentication = require('./data/db/controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');
var path = require('path');
var publicPath = path.resolve(__dirname, 'public');
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const congressBill = require('./data/db/UpcomingCongressionalVotes.model');
const senateBill = require('./data/db/UpcomingSenateBills.model');


///////////////////////////////////////// Models
var User = require('./data/db/User.model');
var Zipcode = require('./data/db/Zipcode.model');
var CandidateSummary = require('./data/db/Candidate_Summary.model');
var Contribution = require('./data/db/Contribution.model');
var GE_Turnout = require('./data/db/Gen_Election_Voter_Turnout.model');
var LDR_PAC_Sponsor = require('./data/db/LDR_PAC_Sponsor.model');
var Administrative_Fine = require('./data/db/Administrative_Fine.model');
var UserOpinion = require('./data/db/UserOpinion.model');

/////////////////////////////////////////// API helper functions

function validateNumber(aString) {
  var results = aString.replace(/(\D)/g, '0');
  return results;
};



//////////////////////////////////////////



module.exports = function(app) {
  


  app.post('/userOpinions', requireAuth, function(req, res) {
    var id = req.body.userId;
    var billNumber = req.body.billNumber;
    var opinion = req.body.opinion;
    var votedAt = Date.parse(new Date());

    var thisOpinion = new UserOpinion();
    thisOpinion.userid = id;
    thisOpinion.billNumber = billNumber;
    thisOpinion.decision = JSON.parse(opinion);
    thisOpinion.votedAt = votedAt;

  });

  app.post('/signin', function(req, res, next) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({message: 'Please fill out all fields'});
    }
    passport.authenticate('local', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (user) {
        console.log(user);
        return res.json({
          userId: user._id,
        });
      } else {
        console.log('no user');
        return res.status(401).json(info);
      }
    })(req, res, next);
  });

  app.post('/signup', Authentication.signup);

  //route to return the representative for the district based on the zipcode lookup
  app.get('/api/representatives/:zipcode', function(req, res) {
    var zipcode = req.params.zipcode;
    var storage;
    Zipcode.find({ zipcode: zipcode}).exec(function(err, doc){
      var state = doc[0].state,
          district = doc[0].district;
      var url;
      if (doc[1]) {
        url = 'https://www.govtrack.us/api/v2/role?current=true&district=' + district + '&district=' + doc[1].district + '&state=' + state
      } else {
        url = 'https://www.govtrack.us/api/v2/role?current=true&district=' + district + '&state=' + state
      }
    fetch(url)
    .then(function(rep) {
      return rep.json();
    }).then(function(val) {
      return val;
    }).then(function(congressperson) {
      fetch('https://www.govtrack.us/api/v2/role?current=true&role_type=senator&state=CA')
          .then(function(img) {
            return img.json();
          })
          .then(function(senator) {
            for (var i = congressperson.objects.length - 1; i >= 0; i--) {
              senator.objects.push(congressperson.objects[i])
            }
            res.send(senator);
          });
    });

    });  
  });

  app.get('/representatives/:id', function(req, res) {
    res.sendFile(publicPath + '/index.html');
  });

  app.get('/representatives', function(req, res) {
    res.sendFile(publicPath + '/index.html')
  });

  app.get('/upcoming_bills', function(req, res) {
    res.sendFile(publicPath + '/index.html');
  });

  app.get('/login', function(req, res) {
    res.sendFile(publicPath + '/index.html');
  })

  app.post('/api/signup', function(req, res, next) {
  if (!req.body.email || !req.body.password) {
    console.log(req.params);
    return res.status(400).json({ message: 'Please fill out all fields' });
  }
    // console.log('***************', Object.keys(req));
  var user = new User();
  user.password = req.body.password;
  user.email = req.body.email;
  console.log('this is the user', user);

  user.save(function (err, success) {
      if (err) {
        return next(err);
      }
      return res.json({
        'theSmellOfSuccess': true
      });
    });      
});


// senate bills
  app.get('/api/data/senate_bills', (req, res) => {
    senateBill.find({}, (err, doc) => {
      if (err) {
        console.warn('error getting senate bills', err);
      }
      res.send(doc);
    });
  });

  // house bills
  app.get('/api/data/house_bills', (req, res) => {
    congressBill.find({}, (error, bill) => {
      if (error) {
        console.warn('error getting house bill', error);
      }
      res.send(bill);
    });
  })




///////////////////////////////////////////////////////////////// Queryable API



  app.get('/api/data/CandidateSummary', function(req, res, next) {

    var data = CandidateSummary.find({})
    .exec( function(err, data){
      if (err) {
        res.send('an error occured fetching your data :(');
      } else {
        res.json(data);
      }
    });
  });


  app.get('/api/data/CandidateSummary/:zipcode/:collectionYear', function(req, res) {

      req.params.zipcode = validateNumber(req.params.zipcode);
      req.params.collectionYear = validateNumber(req.params.collectionYear);
      //@TODO: Update so 2016 is not hardcoded in
      console.log('Number(req.params.collectionYear)', Number(req.params.collectionYear))
      if(Number(req.params.collectionYear) <= 2016 &&
        Number(req.params.collectionYear) >= 2000 &&
        req.params.zipcode.length === 5
        ) {

      console.log('req.params.collectionYear:', req.params.collectionYear);
      console.log('req.params.zipcode:', req.params.zipcode);
      zipcode = req.params.zipcode;

      Zipcode.find({ zipcode: zipcode }).exec(function(error, zipObject) {
        if (error) { console.log('error retrieving zipcode', error); }

        console.log('the Zip Object:', zipObject);
        var theYear = Date.parse('01/01/' + req.params.collectionYear);

        if (zipObject.length > 1) {
          var storage = [];
          var iterations = zipObject.length;
          var i = 0;
          asyncLoop(iterations, function(loop) {


            console.log('this is theYear before entering Query #MultipleObjects:', theYear);

            CandidateSummary.find({ year_of_collection: theYear, can_off_sta: zipObject[i].state, can_off_dis: zipObject[i].district })

          .exec(function(err, docs) {

            if (err) {
              console.log(loop.iteration(), 'Candidate was skipped.', err);
              if (i < iterations) {
                i++;
                loop.next();
              } else { 
                loop.next(); 
              }

            } else {
              if (i < iterations) {
                i++;
                console.log(loop.iteration(), 'Candidate has been sent');

                storage.push(docs);  
                loop.next();
              }
            }
          });
          }, function() { res.json(storage); });
        } else {
          if( zipObject[0] ){

            console.log('this is theYear before entering Query #SingleObject:', theYear);
            console.log('this is zipObject.state:', zipObject[0].state);
            console.log('this is zipObject.district:', zipObject[0].district);

            CandidateSummary.find({ year_of_collection: theYear, can_off_sta: zipObject[0].state, can_off_dis: zipObject[0].district })
            .exec(function(err, documents) {
              if (err) { console.log('there was an error', err) } else { res.json(documents) }

            });
          } else {
            res.status(404).send('Invalid query');
          }
        }
      }); 

    } else {
      res.status(404).send('Invalid Year or Zipcode Entered');
    }
  });

};


