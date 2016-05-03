const Authentication = require('./data/db/controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');
var path = require('path');
var publicPath = path.resolve(__dirname, 'public');
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });
const jwt = require('jwt-simple');
const congressBill = require('./data/db/upcomingCongressionalVotes.model');
const senateBill = require('./data/db/UpcomingSenateBills.model');
const config = require('./config');
var CronJob = require('cron').CronJob;
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({
  changeOrigin: true
});
var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3500;


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
  
  app.listen(port, function () {
    console.log('Server running on port ' + port);
  });

  app.post('/userOpinions', requireAuth, function(req, res) {
    var decode = jwt.decode(req.headers.authorization, config.secret)
    var id = decode.sub;
    var billNumber = req.body.billNumber;
    var opinion = req.body.opinion;
    var votedAt = Date.parse(new Date());

    var thisOpinion = new UserOpinion();
    thisOpinion.userid = id;
    thisOpinion.billNumber = billNumber;
    thisOpinion.decision = JSON.parse(opinion);
    thisOpinion.votedAt = votedAt;

  });

  app.post('/signin', requireSignin, Authentication.signin);
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

  app.get('/api/zipcode/:lat/:long', function(req, res) {
    fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + req.params.lat + ',' + req.params.long + ' &result_type=postal_code&key=' + config.GOOGLE_API_KEY)
      .then(response => response.json())
      .then(json => res.send(json))
  })

  app.get('/api/words/:rep', function(req, res) {
    fetch('http://capitolwords.org/api/1/phrases.json?entity_type=legislator&entity_value=' + req.params.rep + '&sort=count+desc&apikey=' + config.CAPITOL_API_KEY)
      .then(response => response.json())
      .then(json => res.send(json))
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
            CandidateSummary.find({ can_off_dis: zipObject[0].district, can_off_sta: zipObject[0].state})
            .exec(function(err, documents) {
              if (err) { 
                console.log('there was an error', err) 
              } else { 
                console.log('these are the documents from can_off', documents)
                res.json(documents) 
              }

            });
            // CandidateSummary.find({ year_of_collection: 1451606400000 })
            // .exec(function(err, documents) {
            //   if (err) { 
            //     console.log('there was an error', err) 
            //   } else { 
            //     console.log('these are the documents from the_year', documents)
            //     res.json(documents) 
            //   }

            // });
          } else {
            res.status(404).send('Invalid query');
          }
        }
      }); 

    } else {
      res.status(404).send('Invalid Year or Zipcode Entered');
    }
  });

  //if we're not in production, this proxies requests to localhost:3000 and sends them to our webpack server at localhost:8080
  if (!isProduction) {
    var bundle = require('./server/compiler.js');
    bundle();
    app.all('/build/*', function (req, res) {
      proxy.web(req, res, {
        target: 'http://localhost:8080'
      });
    });
  }

  proxy.on('error', function(e) {
    console.log('Could not connect to proxy, please try again...');
  });
  //catch all other get requests, such as when refreshing
  app.get('*', function(req, res) {
    res.sendFile(publicPath + '/index.html');
  });

};


function asyncLoop(iterations, func, callback) {
var index = 0;
var done = false;
var loop = {
    next: function() {
        if (done) {
            return;
        }

        if (index < iterations) {
            index++;
            func(loop);

        } else {
            done = true;
            callback();
        }
    },

    iteration: function() {
        return index - 1;
    },

    break: function() {
        done = true;
        callback();
    }
};
loop.next();
return loop;
}

// cronjob runs every day at 9am Pacific Time

new CronJob('00 00 09 * * *', () => {
  // Collects bills to be debated before House and Senate and send them to the database
  collectBills('https://www.govtrack.us/api/v2/bill?sort=-introduced_date&bill_type=house_bill', congressBill);
  collectBills('https://www.govtrack.us/api/v2/bill?sort=-introduced_date&bill_type=senate_bill', senateBill);
  // Add any other data collecting functions we want automated here

}, true, 'America/Los_Angeles');