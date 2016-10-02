myApp.controller("DataPageController", ["$scope", "$http", "$location", 'AuthFactory', function($scope, $http, $location, AuthFactory) {
    console.log("Loaded: Data Page Controller");

    // function BUILDSPRINT2DATABASE() {
    //     $http.put('/databaseBuild').then(function() {});
    // }
    // BUILDSPRINT2DATABASE();

    // counter for tabbed html views in main pages
    $scope.tab = 1;
    var sprint = {
        title: "test (start/finish)",
        data: [],
        dateStart: Date('4/23/2016'),
        dateEnd: Date('3/21/2016')
    }
    $scope.currentSprintOpen = "";

    $scope.sprintHistory = [sprint, sprint, sprint];

    //TODO: PUT INTO FACTORY!!!
    function getData(database) {
        var promise = $http.get('/userData', { //SELECT * FROM database
            params: {
                db: database
            }
        }).then(function(data) {
            console.log('GET COMPLETE: Updated $scope.' + database);
            return data.data;
        });

        return promise;
    }

    getData('sprint2').then(function(data) {
        $scope.sprintHistory[1] = {
            title: "Sprint 2 (08/23-09/21)",
            data: data
        };

        // the following code gets just Liz's 0/1 for 8/23
        // dayData = $scope.sprintHistory[1].data[0].date_8_23;



        var playerData = $scope.sprintHistory[1].data;
        var count = {};

        for (i = 1; i < playerData.length; i++) {
            var day = playerData[i];

            _.keys(day).forEach(function(key) {
                if (key == "member_score" || key == "id" || key == "member_name" || key == "member_team" || key == "team_score") {

                } else {
                    count[key] = 0;
                }
            }); // end for each
        }
        for (i = 1; i < playerData.length; i++) {
            var day = playerData[i];

            _.keys(day).forEach(function(key) {

                if (key == "member_score" || key == "id" || key == "member_name" || key == "member_team" || key == "team_score") {
                    // do nothing
                } else {
                    if (day[key] == 1) {
                        count[key]++;
                    }
                }
            }); // end for each

            var data = [];
            _.keys(count).forEach(function(key, i) {
                data.push({
                    'day': i,
                    'commit': count[key]
                })
            });
        }

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

                // Parse the date / time
                // var	parseDate = d3.time.format("%d-%b-%y").parse;
                // var formatTime = d3.time.format("%e %B");// Format tooltip date / time

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

                // // Define 'div' for tooltips
                // var div = d3.select("#chart")
                //     .append("div") // declare the tooltip div
                //     // .attr("class", "tooltip") // apply the 'tooltip' class
                //     .style("opacity", 0); // set the opacity to nil

                // Adds the svg canvas
                var svg = d3.select("#chart")
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform",
                        "translate(" + margin.left + "," + margin.top + ")");

                var data2 = [
                    {"day": 1, 'commit': 30},
                    {'day': 2, 'commit': 50},
                    {'day': 3, 'commit': 80},
                    {'day': 4, 'commit': 60},
                    {'day': 5, 'commit': 70},
                    {'day': 6, 'commit': 30},
                    {'day': 7, 'commit': 90},
                    {'day': 8, 'commit': 100},
                    {'day': 9, 'commit': 20},
                    {'day': 10, 'commit': 10}
                  ];

                // // yo yo this is the function that will produce multiple lines
                // var dataNest = d3.nest()
                //     .key(function(d) {
                //         return d.symbol; // idk wtf .symbol is doing :(
                //     })
                //     .entries(data); // fucking entries wtf!!??

                // Get the data
                //d3.csv("data.csv", function(error, data) {

                // data.forEach(function(d) {
                // 	d.day = parseDate(d.day);
                // 	d.commit = +d.commit;
                // });

                // Scale the range of the data
                x.domain(d3.extent(data, function(d) {
                    return d.day;
                }));
                // be sure these are set to create the x/y axises based on the largest data set
                y.domain([0, d3.max(data2, function(d) {
                    return d.commit;
                })]);


                var dataArray = [data, data2];
                // Add the valueline path.
                dataArray.forEach (function(data){

                  svg.append("path")
                      .attr("class", "line")
                      .attr("d", valueline(data))

                      // draw the scatterplot
                      svg.selectAll("dot")
                          .data(data)
                          .enter().append("circle")
                          .attr("r", 3)
                          .attr("cx", function(d) {
                              return x(d.day);
                          })
                          .attr("cy", function(d) {
                              return y(d.commit);
                          })
                })

                var color = d3.scale.category10();

                // Loop through each symbol / key
                // dataArray.forEach(function(d) {
                //
                //     svg.append("path")
                //         .attr("class", "line")
                //         .style("stroke", function() {
                //             return d.color = color(d.key); })
                //         .attr("d", valueline(d.values));
                //
                // });

                // Tooltip stuff after this
                // .on("mouseover", function(d) {
                // div.transition()
                // 	.duration(500)
                // 	.style("opacity", 0);
                // div.transition()
                // 	.duration(200)
                // 	.style("opacity", .9);
                // div	.html(
                // 	'<a>' + // The first <a> tag
                // 	formatTime(d.day) +
                // 	"</a>" +    // closing </a> tag
                // 	"<br/>"  + d.commit)
                // .style("left", (d3.event.pageX) + "px")
                // .style("top", (d3.event.pageY - 28) + "px");
                // });

                // Add the X Axis
                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                // Add the Y Axis
                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis);

            }) // end getData promise


// experiments
// Set the dimensions of the canvas / graph
// var margin = {
//         top: 30,
//         right: 20,
//         bottom: 30,
//         left: 50
//     },
//     width = 750 - margin.left - margin.right,
//     height = 250 - margin.top - margin.bottom;
//
// // Parse the date / time
// // var	parseDate = d3.time.format("%d-%b-%y").parse;
// // var formatTime = d3.time.format("%e %B");// Format tooltip date / time
//
// // Set the ranges
// var x = d3.scale.linear().range([0, width]);
// var y = d3.scale.linear().range([height, 0]);
//
//
// // Define the axes
// var xAxis = d3.svg.axis()
//     .scale(x)
//     .orient("bottom").ticks(10);
//
// var yAxis = d3.svg.axis()
//     .scale(y)
//     .orient("left").ticks(2);
//
// // Define the line
// var valueline = d3.svg.line()
//     .x(function(d) {
//         return x(d.day);
//     })
//     .y(function(d) {
//         return y(d.commit);
//     });
//
// // // Define 'div' for tooltips
// // var div = d3.select("#chart")
// //     .append("div") // declare the tooltip div
// //     // .attr("class", "tooltip") // apply the 'tooltip' class
// //     .style("opacity", 0); // set the opacity to nil
//
// // Adds the svg canvas
// var svg = d3.select("#chart")
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform",
//         "translate(" + margin.left + "," + margin.top + ")");
//
// var data2 = [
//     {"day": 1, 'commit': 30},
//     {'day': 2, 'commit': 50},
//     {'day': 3, 'commit': 80},
//     {'day': 4, 'commit': 60},
//     {'day': 5, 'commit': 70},
//     {'day': 6, 'commit': 30},
//     {'day': 7, 'commit': 90},
//     {'day': 8, 'commit': 100},
//     {'day': 9, 'commit': 20},
//     {'day': 10, 'commit': 10}
//   ];
//
//   var dataArray = [data, data2];
//   // Add the valueline path.
//   // dataArray.forEach (function(data){
//   //
//   //   svg.append("path")
//   //       .attr("class", "line")
//   //       .attr("d", valueline(data))
//   //
//   //       // draw the scatterplot
//   //       svg.selectAll("dot")
//   //           .data(data)
//   //           .enter().append("circle")
//   //           .attr("r", 3)
//   //           .attr("cx", function(d) {
//   //               return x(d.day);
//   //           })
//   //           .attr("cy", function(d) {
//   //               return y(d.commit);
//   //           })
//   // })
//
// // // yo yo this is the function that will produce multiple lines
// var dataNest = d3.nest()
//     .key(function(d) {
//         return d.symbol; // idk wtf .symbol is doing :(
//     })
//     .entries(dataArray); // fucking entries wtf!!??
//
//
// var color = d3.scale.category10();
//
// legendSpace = width/dataNest.length; // spacing for the legend
//
//     dataNest.forEach (function(data){
//       svg.append("path")
//           .attr("class", "line")
//           .attr("d", valueline(data))
//
//           // draw the scatterplot
//           svg.selectAll("dot")
//               .data(data)
//               .enter().append("circle")
//               .attr("r", 3)
//               .attr("cx", function(d) {
//                   return x(data.day);
//               })
//               .attr("cy", function(d) {
//                   return y(data.commit);
//               })
//
//               // Add the Legend
//             svg.append("text")
//                 .attr("x", (legendSpace/2)+i*legendSpace)  // space legend
//                 .attr("y", height + (margin.bottom/2)+ 5)
//                 .attr("class", "legend")    // style the legend
//                 .style("fill", function() { // Add the colours dynamically
//                     return data.color = color(data.key); })
//                 .on("click", function(){
//                     // Determine if current line is visible
//                     var active   = data.active ? false : true,
//                     newOpacity = active ? 0 : 1;
//                     // Hide or show the elements based on the ID
//                     d3.select("#tag"+data.key.replace(/\s+/g, ''))
//                         .transition().duration(100)
//                         .style("opacity", newOpacity);
//                     // Update whether or not the elements are active
//                     data.active = active;
//                     })
//                 .text(data.key);
//     })
//
// // Scale the range of the data
// x.domain(d3.extent(data, function(d) {
//     return d.day;
// }));
// // be sure these are set to create the x/y axises based on the largest data set
// y.domain([0, d3.max(data2, function(d) {
//     return d.commit;
// })]);
//
//
// // Loop through each symbol / key
// dataArray.forEach(function(d) {
//
//     svg.append("path")
//         .attr("class", "line")
//         .style("stroke", function() {
//             return d.color = color(d.key); })
//         .attr("d", valueline(d.values));
//
// });
//
// // Tooltip stuff after this
// // .on("mouseover", function(d) {
// // div.transition()
// // 	.duration(500)
// // 	.style("opacity", 0);
// // div.transition()
// // 	.duration(200)
// // 	.style("opacity", .9);
// // div	.html(
// // 	'<a>' + // The first <a> tag
// // 	formatTime(d.day) +
// // 	"</a>" +    // closing </a> tag
// // 	"<br/>"  + d.commit)
// // .style("left", (d3.event.pageX) + "px")
// // .style("top", (d3.event.pageY - 28) + "px");
// // });
//
// // Add the X Axis
// svg.append("g")
//     .attr("class", "x axis")
//     .attr("transform", "translate(0," + height + ")")
//     .call(xAxis);
//
// // Add the Y Axis
// svg.append("g")
//     .attr("class", "y axis")
//     .call(yAxis);
//
// }) // end getData promise

    $scope.clickedSprint = function(sprintTitle) {
        console.log('clicked on: ', sprintTitle);
        $scope.sprintHistory.forEach(function(sprint) {
            if (sprint.title == sprintTitle) {
                $scope.currentSprintOpen = sprintTitle;
            }
        });
    }

}]); // end controller
