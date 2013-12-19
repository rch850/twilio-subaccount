var twilio = require("twilio"),
    config = require("../config.json");

var title = "Twilio Subaccount Manager";
var client = new twilio.RestClient(config.accountSid, config.authToken);

/*
 * GET home page.
 */

exports.index = function(req, res){

  client.accounts.get(function(err, response) {
    if (err) {
      res.render('index', {
        title: title + " - " + err,
        subaccounts: []
      });
      return;
    }

    res.render('index', {
      title: title,
      subaccounts: response.accounts
    });
  });
};

exports.login = function(req, res) {

  res.render('login', {
    title: title
  });

};

/**
 * POST new subaccount.
 */

exports.createAccount = function(req, res) {

  if (req.body.friendlyName) {
    client.accounts.post(req.body, function(err, response) {
      if (err) {
        console.error(err);
      }
      res.redirect('/');
    });
  } else {
    res.redirect('/');
  }

};

/**
 * DELETE delete subaccount.
 */

exports.destroyAccount = function(req, res) {

  if (req.params.sid) {
    client.accounts(req.params.sid).post({
      "Status": "closed"
    }, function(err, response) {
      if (err) {
        console.error(err);
      }
      res.redirect('/');
    });
  } else {
    res.redirect('/');
  }

};
