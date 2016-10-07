myApp.controller("DataPageController", ["$scope", "$http", "$location", 'AuthFactory', 'UserFactory', function($scope, $http, $location, AuthFactory, UserFactory) {
    console.log("Loaded: Data Page Controller");

    $scope.sprint1 = false;
    $scope.sprint2 = false;
    $scope.sprint3 = false;

    $scope.newButton2 = function(){
      $http.get('/newRoute/sprint2_data').then(function(data){
        console.log('data from sprint2', data);
      });

      $http.get('/newRoute/sprint2_teams').then(function(data){
        console.log('these are the members and teams from sprint2', data)
      });
    }
    

//5 players
var deimos = {size: 5, team: "deimos", id: 1, array: [
        {'day': 1, 'commit': 5},
        {'day': 2, 'commit': 5},
        {'day': 3, 'commit': 4},
        {'day': 4, 'commit': 4},
        {'day': 5, 'commit': 4},
        {'day': 6, 'commit': 4},
        {'day': 7, 'commit': 4},
        {'day': 8, 'commit': 2},
        {'day': 9, 'commit': 4},
        {'day': 10, 'commit': 4},
        {'day': 11, 'commit': 3},
        {'day': 12, 'commit': 4},
        {'day': 13, 'commit': 4},
        {'day': 14, 'commit': 3},
        {'day': 15, 'commit': 4},
        {'day': 16, 'commit': 4},
        {'day': 17, 'commit': 3},
        {'day': 18, 'commit': 3},
        {'day': 19, 'commit': 3},
        {'day': 20, 'commit': 4},
        {'day': 21, 'commit': 4},
        {'day': 22, 'commit': 4},
        {'day': 23, 'commit': 3},
        {'day': 24, 'commit': 3},
        {'day': 25, 'commit': 3},
        {'day': 26, 'commit': 1},
        {'day': 27, 'commit': 4},
        {'day': 28, 'commit': 3},
        {'day': 29, 'commit': 2},
        {'day': 30, 'commit': 3}
      ]}

//15 players
var linus = {size: 15, team:"linus", id: 2, array: [
         {'day': 1, 'commit': 15},
         {'day': 2, 'commit': 15},
         {'day': 3, 'commit': 15},
         {'day': 4, 'commit': 15},
         {'day': 5, 'commit': 14},
         {'day': 6, 'commit': 14},
         {'day': 7, 'commit': 14},
         {'day': 8, 'commit': 15},
         {'day': 9, 'commit': 13},
         {'day': 10, 'commit': 15},
         {'day': 11, 'commit': 11},
         {'day': 12, 'commit': 11},
         {'day': 13, 'commit': 13},
         {'day': 14, 'commit': 13},
         {'day': 15, 'commit': 14},
         {'day': 16, 'commit': 10},
         {'day': 17, 'commit': 15},
         {'day': 18, 'commit': 13},
         {'day': 19, 'commit': 11},
         {'day': 20, 'commit': 12},
         {'day': 21, 'commit': 13},
         {'day': 22, 'commit': 13},
         {'day': 23, 'commit': 12},
         {'day': 24, 'commit': 13},
         {'day': 25, 'commit': 13},
         {'day': 26, 'commit': 14},
         {'day': 27, 'commit': 15},
         {'day': 28, 'commit': 14},
         {'day': 29, 'commit': 13},
         {'day': 30, 'commit': 14}
       ]}


//5 players
var io = {size: 5, team: "io", id: 3, array: [
        {'day': 1, 'commit': 5},
        {'day': 2, 'commit': 5},
        {'day': 3, 'commit': 5},
        {'day': 4, 'commit': 4},
        {'day': 5, 'commit': 4},
        {'day': 6, 'commit': 4},
        {'day': 7, 'commit': 5},
        {'day': 8, 'commit': 5},
        {'day': 9, 'commit': 5},
        {'day': 10, 'commit': 4},
        {'day': 11, 'commit': 3},
        {'day': 12, 'commit': 2},
        {'day': 13, 'commit': 4},
        {'day': 14, 'commit': 4},
        {'day': 15, 'commit': 4},
        {'day': 16, 'commit': 4},
        {'day': 17, 'commit': 5},
        {'day': 18, 'commit': 4},
        {'day': 19, 'commit': 3},
        {'day': 20, 'commit': 3},
        {'day': 21, 'commit': 3},
        {'day': 22, 'commit': 4},
        {'day': 23, 'commit': 3},
        {'day': 24, 'commit': 2},
        {'day': 25, 'commit': 2},
        {'day': 26, 'commit': 2},
        {'day': 27, 'commit': 2},
        {'day': 28, 'commit': 2},
        {'day': 29, 'commit': 3},
        {'day': 30, 'commit': 3}
      ]}

//6 players
var ida = {size: 6, team: "ida", id: 4, array: [
         {'day': 1, 'commit': 6},
         {'day': 2, 'commit': 5},
         {'day': 3, 'commit': 5},
         {'day': 4, 'commit': 5},
         {'day': 5, 'commit': 6},
         {'day': 6, 'commit': 6},
         {'day': 7, 'commit': 6},
         {'day': 8, 'commit': 6},
         {'day': 9, 'commit': 6},
         {'day': 10, 'commit': 4},
         {'day': 11, 'commit': 5},
         {'day': 12, 'commit': 3},
         {'day': 13, 'commit': 4},
         {'day': 14, 'commit': 5},
         {'day': 15, 'commit': 5},
         {'day': 16, 'commit': 3},
         {'day': 17, 'commit': 3},
         {'day': 18, 'commit': 4},
         {'day': 19, 'commit': 2},
         {'day': 20, 'commit': 2},
         {'day': 21, 'commit': 3},
         {'day': 22, 'commit': 4},
         {'day': 23, 'commit': 4},
         {'day': 24, 'commit': 3},
         {'day': 25, 'commit': 4},
         {'day': 26, 'commit': 4},
         {'day': 27, 'commit': 3},
         {'day': 28, 'commit': 3},
         {'day': 29, 'commit': 4},
         {'day': 30, 'commit': 4}
       ]}

 //5 players
 var gaspra = {size: 5, team: "gaspra", id: 5, array: [
          {'day': 1, 'commit': 5},
          {'day': 2, 'commit': 5},
          {'day': 3, 'commit': 5},
          {'day': 4, 'commit': 5},
          {'day': 5, 'commit': 5},
          {'day': 6, 'commit': 5},
          {'day': 7, 'commit': 5},
          {'day': 8, 'commit': 5},
          {'day': 9, 'commit': 5},
          {'day': 10, 'commit': 5},
          {'day': 11, 'commit': 5},
          {'day': 12, 'commit': 5},
          {'day': 13, 'commit': 5},
          {'day': 14, 'commit': 5},
          {'day': 15, 'commit': 5},
          {'day': 16, 'commit': 5},
          {'day': 17, 'commit': 5},
          {'day': 18, 'commit': 5},
          {'day': 19, 'commit': 5},
          {'day': 20, 'commit': 5},
          {'day': 21, 'commit': 5},
          {'day': 22, 'commit': 5},
          {'day': 23, 'commit': 5},
          {'day': 24, 'commit': 5},
          {'day': 25, 'commit': 4},
          {'day': 26, 'commit': 5},
          {'day': 27, 'commit': 5},
          {'day': 28, 'commit': 5},
          {'day': 29, 'commit': 5},
          {'day': 30, 'commit': 5}
        ]}


//5 players
var europa = {size: 5, team: "europa", id: 6, array: [
         {'day': 1, 'commit': 5},
         {'day': 2, 'commit': 5},
         {'day': 3, 'commit': 4},
         {'day': 4, 'commit': 5},
         {'day': 5, 'commit': 5},
         {'day': 6, 'commit': 5},
         {'day': 7, 'commit': 4},
         {'day': 8, 'commit': 5},
         {'day': 9, 'commit': 5},
         {'day': 10, 'commit': 3},
         {'day': 11, 'commit': 3},
         {'day': 12, 'commit': 3},
         {'day': 13, 'commit': 3},
         {'day': 14, 'commit': 2},
         {'day': 15, 'commit': 3},
         {'day': 16, 'commit': 3},
         {'day': 17, 'commit': 3},
         {'day': 18, 'commit': 3},
         {'day': 19, 'commit': 3},
         {'day': 20, 'commit': 3},
         {'day': 21, 'commit': 4},
         {'day': 22, 'commit': 3},
         {'day': 23, 'commit': 3},
         {'day': 24, 'commit': 3},
         {'day': 25, 'commit': 2},
         {'day': 26, 'commit': 3},
         {'day': 27, 'commit': 3},
         {'day': 28, 'commit': 3},
         {'day': 29, 'commit': 3},
         {'day': 30, 'commit': 3}
       ]}

//5 players
var dactyl = {size: 5, team: "dactyl", id: 7, array: [
        {'day': 1, 'commit': 5},
        {'day': 2, 'commit': 5},
        {'day': 3, 'commit': 5},
        {'day': 4, 'commit': 5},
        {'day': 5, 'commit': 5},
        {'day': 6, 'commit': 5},
        {'day': 7, 'commit': 5},
        {'day': 8, 'commit': 5},
        {'day': 9, 'commit': 5},
        {'day': 10, 'commit': 5},
        {'day': 11, 'commit': 4},
        {'day': 12, 'commit': 3},
        {'day': 13, 'commit': 4},
        {'day': 14, 'commit': 5},
        {'day': 15, 'commit': 4},
        {'day': 16, 'commit': 4},
        {'day': 17, 'commit': 4},
        {'day': 18, 'commit': 3},
        {'day': 19, 'commit': 3},
        {'day': 20, 'commit': 4},
        {'day': 21, 'commit': 4},
        {'day': 22, 'commit': 4},
        {'day': 23, 'commit': 4},
        {'day': 24, 'commit': 4},
        {'day': 25, 'commit': 3},
        {'day': 26, 'commit': 2},
        {'day': 27, 'commit': 3},
        {'day': 28, 'commit': 3},
        {'day': 29, 'commit': 4},
        {'day': 30, 'commit': 3}
      ]}

//5 players
var eros = {size: 5, team: "eros", id: 8, array: [
         {'day': 1, 'commit': 4},
         {'day': 2, 'commit': 5},
         {'day': 3, 'commit': 5},
         {'day': 4, 'commit': 4},
         {'day': 5, 'commit': 5},
         {'day': 6, 'commit': 5},
         {'day': 7, 'commit': 5},
         {'day': 8, 'commit': 5},
         {'day': 9, 'commit': 3},
         {'day': 10, 'commit': 4},
         {'day': 11, 'commit': 3},
         {'day': 12, 'commit': 4},
         {'day': 13, 'commit': 3},
         {'day': 14, 'commit': 3},
         {'day': 15, 'commit': 3},
         {'day': 16, 'commit': 3},
         {'day': 17, 'commit': 3},
         {'day': 18, 'commit': 3},
         {'day': 19, 'commit': 2},
         {'day': 20, 'commit': 2},
         {'day': 21, 'commit': 3},
         {'day': 22, 'commit': 2},
         {'day': 23, 'commit': 2},
         {'day': 24, 'commit': 1},
         {'day': 25, 'commit': 2},
         {'day': 26, 'commit': 2},
         {'day': 27, 'commit': 2},
         {'day': 28, 'commit': 3},
         {'day': 29, 'commit': 2},
         {'day': 30, 'commit': 2}
       ]}


 //25 players
 var noTeam = {size: 25, team: "noTeam", id: 9, array: [
          {'day': 1, 'commit': 22},
          {'day': 2, 'commit': 21},
          {'day': 3, 'commit': 22},
          {'day': 4, 'commit': 22},
          {'day': 5, 'commit': 16},
          {'day': 6, 'commit': 18},
          {'day': 7, 'commit': 19},
          {'day': 8, 'commit': 22},
          {'day': 9, 'commit': 22},
          {'day': 10, 'commit': 19},
          {'day': 11, 'commit': 18},
          {'day': 12, 'commit': 14},
          {'day': 13, 'commit': 16},
          {'day': 14, 'commit': 16},
          {'day': 15, 'commit': 17},
          {'day': 16, 'commit': 16},
          {'day': 17, 'commit': 16},
          {'day': 18, 'commit': 12},
          {'day': 19, 'commit': 9},
          {'day': 20, 'commit': 10},
          {'day': 21, 'commit': 17},
          {'day': 22, 'commit': 13},
          {'day': 23, 'commit': 15},
          {'day': 24, 'commit': 14},
          {'day': 25, 'commit': 13},
          {'day': 26, 'commit': 9},
          {'day': 27, 'commit': 9},
          {'day': 28, 'commit': 10},
          {'day': 29, 'commit': 13},
          {'day': 30, 'commit': 12}
        ]}





        //25 players
        var sprint1Team = {size: 25, array: [
                 {'day': 1, 'commit': 42},
                 {'day': 2, 'commit': 48},
                 {'day': 3, 'commit': 48},
                 {'day': 4, 'commit': 46},
                 {'day': 5, 'commit': 42},
                 {'day': 6, 'commit': 35},
                 {'day': 7, 'commit': 36},
                 {'day': 8, 'commit': 41},
                 {'day': 9, 'commit': 44},
                 {'day': 10, 'commit': 47},
                 {'day': 11, 'commit': 44},
                 {'day': 12, 'commit': 34},
                 {'day': 13, 'commit': 32},
                 {'day': 14, 'commit': 32},
                 {'day': 15, 'commit': 35},
                 {'day': 16, 'commit': 37},
                 {'day': 17, 'commit': 34},
                 {'day': 18, 'commit': 40},
                 {'day': 19, 'commit': 35},
                 {'day': 20, 'commit': 32},
                 {'day': 21, 'commit': 30},
                 {'day': 22, 'commit': 35},
                 {'day': 23, 'commit': 35},
                 {'day': 24, 'commit': 30},
                 {'day': 25, 'commit': 30},
                 {'day': 26, 'commit': 28},
                 {'day': 27, 'commit': 24},
                 {'day': 28, 'commit': 29},
                 {'day': 29, 'commit': 29},
                 {'day': 30, 'commit': 32}
               ]}


               function checkDupes(teamName){
                 console.log('check dupes func ran just now');
                 d3.selectAll('path.line').remove();
                 var tempBool = false,
                 counter;
                 if(dataArray.length != 0){
                 dataArray.forEach(function(team, index){
                   if(team.team == teamName){
                     counter = index;
                     tempBool = true;
                     dataArray.splice(index, 1);
                   }
                 })
               }
                 return  {unique:tempBool, index:counter};

               }
                              $scope.showData = function(team){
                                switch(team){
                                  case '2All':
                                   dataArray = [];
                                   dataArray.push(deimos, linus, io, ida, gaspra, europa, dactyl, eros);
                                   buildLines(dataArray);
                                   console.log(dataArray);
                                  break;

                                  case '2Linus':
                                  // dataArray = [];
                                  var checkDup = checkDupes('linus');
                                  if(checkDup.unique){
                                    // buildLines(dataArray);
                                  } else {
                                  dataArray.push(linus);
                                  console.log(dataArray);
                                }
                                  buildLines(dataArray);
                                  break;

                                  case '2Io':
                                  // dataArray = [];
                                  var checkDup = checkDupes('io');
                                  if(checkDup.unique){
                                    // buildLines(dataArray);
                                  } else {
                                  dataArray.push(io);
                                  console.log(dataArray);
                                }
                                  buildLines(dataArray);
                                  break;

                                  case '2Ida':
                                  // dataArray = [];
                                  var checkDup = checkDupes('ida');
                                  if(checkDup.unique){
                                    // buildLines(dataArray);
                                  } else {
                                  dataArray.push(ida);
                                  console.log(dataArray);
                                }
                                  buildLines(dataArray);
                                  break;

                                  case '2Gaspra':
                                  // dataArray = [];
                                  var checkDup = checkDupes('gaspra');
                                  if(checkDup.unique){
                                    // buildLines(dataArray);
                                  } else {
                                  dataArray.push(gaspra);
                                  console.log(dataArray);
                                }
                                  buildLines(dataArray);
                                  break;

                                  case '2Europa':
                                  // dataArray = [];
                                  var checkDup = checkDupes('europa');
                                  if(checkDup.unique){
                                    // buildLines(dataArray);
                                  } else {
                                  dataArray.push(europa);
                                  console.log(dataArray);
                                }
                                  buildLines(dataArray);
                                  break;

                                  case '2Dactyl':
                                  var checkDup = checkDupes('dactyl');
                                  if(checkDup.unique){
                                    // buildLines(dataArray);
                                  } else {
                                  dataArray.push(dactyl);
                                  console.log(dataArray);
                                }
                                  buildLines(dataArray);
                                  break;

                                  case '2Eros':
                                  var checkDup = checkDupes('eros');
                                  if(checkDup.unique){
                                    // buildLines(dataArray);
                                  } else {
                                  dataArray.push(eros);
                                  console.log(dataArray);
                                }
                                  buildLines(dataArray);
                                  break;

                                  case '2Deimos':
                                  var checkDup = checkDupes('deimos');
                                  if(checkDup.unique){
                                    // buildLines(dataArray);
                                  } else {
                                  dataArray.push(deimos);
                                  console.log(dataArray);
                                }
                                  buildLines(dataArray);
                                  break;

                                  case '2No':
                                  // dataArray = [];
                                  var checkDup = checkDupes('noTeam');
                                  if(checkDup.unique){
                                    // buildLines(dataArray);
                                  } else {
                                  dataArray.push(noTeam);
                                  console.log(dataArray);
                                }
                                  buildLines(dataArray);

                                  break;
                                }
                              }


                   var getData = UserFactory.getData();

                   $scope.tab = 1;
                   var sprint = {
                       title: "test (start/finish)",
                       data: [],
                       dateStart: Date('4/23/2016'),
                       dateEnd: Date('3/21/2016')
                   }
                   $scope.currentSprintOpen = "";
                   $scope.sprintHistory = [sprint, sprint, sprint];



                   ///////////////////////////////////////
                   //           D3 DATA CODE            //
                   ///////////////////////////////////////
                   // function buildLines(){


                          //  var dataArray = [];
                          //  var tempDataArray = [];
                          //  dataArray.forEach(function(team){
                          //    tempTeam = [];
                          //    team.array.forEach(function(data){
                          //      var newData = (data.commit / team.size) * 100;
                          //      tempTeam.push({day: data.day, commit: newData});
                          //    });
                          //    tempDataArray.push(tempTeam);
                           //
                          //  })
                          //  dataArray = tempDataArray;
                          //  console.log("YAYAY", dataArray);

                           //============================== d3 ===========================//
                           // Set the dimensions of the canvas / graph
                           var margin = {
                                   top: 30,
                                   right: 20,
                                   bottom: 30,
                                   left: 50
                               },
                               width = 750 - margin.left - margin.right,
                               height = 250 - margin.top - margin.bottom;

                           // Set the ranges
                           var x = d3.scale.linear().range([0, width]);
                           var y = d3.scale.linear().range([height, 0]);


                           // Define the axes
                           var xAxis = d3.svg.axis()
                               .scale(x)
                               .orient("bottom").ticks(10);

                           var yAxis = d3.svg.axis()
                               .scale(y)
                               .orient("left").ticks(2);

                           // Define the line
                           var valueline = d3.svg.line()
                               .x(function(d) {
                                   return x(d.day);
                               })
                               .y(function(d) {
                                   return y(d.commit);
                               });

                           // Adds the svg canvas
                           var svg = d3.select("#chart")
                               .append("svg")
                               .attr("width", width + margin.left + margin.right)
                               .attr("height", height + margin.top + margin.bottom)
                               .append("g")
                               .attr("transform",
                                   "translate(" + margin.left + "," + margin.top + ")");


                                   var dataArray = [];


               function buildLines(tempArray){
                 var tempDataArray = [];
                 tempArray.forEach(function(team){
                   tempTeam = [];
                   console.log("team line 584:", team);
                   team.array.forEach(function(data){
                     var newData = (data.commit / team.size) * 100;
                     tempTeam.push({day: data.day, commit: newData});
                     tempTeam.id = team.id;
                   });
                   tempDataArray.push(tempTeam);

                 })
                 tempArray = tempDataArray;
                 console.log("YAYAY", tempArray);
                 console.log(tempArray);
                           // Scale the range of the data
                           x.domain(d3.extent(tempArray[0], function(d) {
                               return d.day;
                           }));
                           // be sure these are set to create the x/y axises based on the largest data set
                           y.domain([0, d3.max(tempArray[0], function(d) {
                               return d.commit;
                           })]);


                           ///////////////////////////////////////
                           //  CODE BELOW APPENDS THE LINE      //
                           ///////////////////////////////////////
                           // Add the valueline path.
                           // $color = d3.scale.category20b();

                           var colorI = 0;
                           var colorArray =
                           ['#1f77b4', '#aec7e8', '#ff7f0e', '#ffdbb7', '#2ca02c',
                           '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5',
                           '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#1f655c',
                           '#0bc1bc', '#bcbd22', '#dbdb8d','#17becf', '#9edae5'];


                           // $scope.showLine = function(id) {
                           //     d3.select('path.line' + id).remove();
                           //     d3.selectAll('circle.dataPoint' + id).remove();
                           // }
                           // $scope.hideData = function() {
                           //     $scope.dataIsShowing = false;
                           //     for (i = 0; i < dataArray.length; i++) {
                           //         d3.select('path.line' + i).remove();
                           //         d3.selectAll('circle.dataPoint' + i).remove();
                           //     }
                           // }
                           // $scope.dataIsShowing = false;
                           // // $scope.showData = function() {
                           //     $scope.dataIsShowing = true;


                               tempArray.forEach(function(data, index) {
                                 console.log("data in d3 append function line 635:", data.id);
                                   // var lineColor = '#492058'
                                   var lineColor = colorArray[colorI];
                                   colorI++;
                                   if (colorI == colorArray.length) {
                                       colorI = 0;
                                   }

                                   svg.append("path")
                                       .attr("class", "line")
                                       .style('stroke-width', 5)
                                       .attr("d", valueline(data))
                                       .style("stroke", lineColor)

                                   // draw the scatterplot
                                   svg.selectAll("dot")
                                       .data(data)
                                      //  .enter().append("circle")
                                      //  .attr("class", "dataPoint" + data.id)
                                      //  .attr("r", 3)
                                      //  .attr("cx", function(d) {
                                      //      return x(d.day);
                                      //  })
                                      //  .attr("cy", function(d) {
                                      //      return y(d.commit);
                                      //  })
                               })

                           //


                           // Add the X Axis
                           svg.append("g")
                               .attr("class", "x axis")
                               .attr("transform", "translate(0," + height + ")")
                               .call(xAxis);

                           // Add the Y Axis
                           svg.append("g")
                               .attr("class", "y axis")
                               .call(yAxis);

                       }




    $scope.clickedSprint = function(sprintTitle) {
        console.log('clicked on: ', sprintTitle);
        $scope.sprintHistory.forEach(function(sprint) {
            if (sprint.title == sprintTitle) {
                $scope.currentSprintOpen = sprintTitle;
            }
        });
    }

}]); // end controller
