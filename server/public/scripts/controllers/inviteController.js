myApp.controller("InviteController", ["$scope", "$http", "$location", "AuthFactory", "UserFactory", function($scope, $http, $location, AuthFactory, UserFactory) {
  console.log("InviteController works");



  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');

  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: '"GitHub Overlord 👥" <githubchallenge@gmail.com>', // sender address
      to: 'rachelweila@gmail.com, theresa.thoraldson@gmail.com, wskcontact@gmail.com, adam.eastvold@gmail.com', // list of receivers
      subject: 'GitHype', // Subject line
      text: '🐴', // plaintext body
      html: '<b>🐴</b>' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });

}]);
