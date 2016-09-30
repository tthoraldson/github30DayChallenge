var phantom = require('phantom');

//getCommits('tthoraldson'); // enter github username
exports.getYearly = function(githubUname){
  var swagArray = [];
  var sitepage = null;
  var phInstance = null;

  phantom.create()
      .then(instance => {
          phInstance = instance;
          return instance.createPage();
      })
      .then(page => {
          sitepage = page;
          return page.open('https://github.com/users/' + githubUname + '/contributions');
      })
      .then(status => {
          console.log(status);

          return sitepage.property('content');
      })
      .then(content => {
          swagArray = content.split('\n');

          var tempArray = [];
          swagArray.forEach(function(line) {
            if (line.substring(11,14) == "rec"){
              var templine = line.substring(84);
              var templine2 = ""
              if (templine[0] == 'c'){
                templine = templine.substring(1);
              } else if (templine[0] == '-') {
                templine = templine.substring(2);
              } else if (templine[0] == 'a') {
                templine = templine.substring(3);
              }

              templine = templine.substring(6); // commits
              templine2 = templine.substring(14, 24); // date
              templine = templine[0];
              tempArray.push({data: templine, date: templine2});
              // tempArray.push(line);

            }
          });
          tempArray.forEach(function(data){
            console.log(data);
          })
      })
      .then(content => {
          sitepage.close();
          phInstance.exit();
      })
      .catch(error => {
          console.log(error);
          phInstance.exit()
      });
}

function getDate(){
  var d = new Date();
  var day = d.getDate();
  var month = d.getMonth() + 1;

  if (day.toString().length < 2) {
    day = '0' + day;
  }

  if (month.toString().length < 2) {
    month = '0' + month;
  }

  var date = d.getFullYear() + '-' + month + '-' + day;
  return date;
}
