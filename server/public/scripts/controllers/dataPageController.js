myApp.controller("DataPageController", ["$scope", "$http", "$location", 'AuthFactory', function($scope, $http, $location, AuthFactory) {
    console.log("Loaded: Data Page Controller");


    // function BUILDSPRINT2DATABASE() {
    //     $http.put('/databaseBuild').then(function() {});
    // }
    // BUILDSPRINT2DATABASE();

    //counter for tabbed html views in main pages
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
        console.log('woop woop?')
        $scope.sprintHistory[1] = {
            title: "Sprint 2 (08/23-09/21)",
            data: data
        };
        console.log($scope.sprintHistory);
    })


    $scope.clickedSprint = function(sprintTitle) {
        console.log('clicked on: ', sprintTitle);
        $scope.sprintHistory.forEach(function(sprint) {
            if (sprint.title == sprintTitle) {
                $scope.currentSprintOpen = sprintTitle;
            }
        });
    }


    //============================== d3 ===========================//
    // Set the dimensions of the canvas / graph
  var	margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 800 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;

  // Parse the date / time
  // var	parseDate = d3.time.format("%d-%b-%y").parse;
  // var formatTime = d3.time.format("%e %B");// Format tooltip date / time

  // Set the ranges
  var	x = d3.scale.linear().range([0, width]);
  var	y = d3.scale.linear().range([height, 0]);


  // Define the axes
  var	xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom").ticks(10);

  var	yAxis = d3.svg.axis()
    .scale(y)
    .orient("left").ticks(2);

  // Define the line
  var	valueline = d3.svg.line()
    .x(function(d) { return x(d.day); })
    .y(function(d) { return y(d.commit); });

  // Define 'div' for tooltips
  var div = d3.select("#chart")
    .append("div")  // declare the tooltip div
    .attr("class", "tooltip")  // apply the 'tooltip' class
    .style("opacity", 0);   // set the opacity to nil

  // Adds the svg canvas
  var	svg = d3.select("#chart")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  // Get the data
  //d3.csv("data.csv", function(error, data) {

  var data = [
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

    // data.forEach(function(d) {
    // 	d.day = parseDate(d.day);
    // 	d.commit = +d.commit;
    // });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.day; }));
    y.domain([0, d3.max(data, function(d) { return d.commit; })]);

    // Add the valueline path.
    svg.append("path")
      .attr("class", "line")
      .attr("d", valueline(data));

    // draw the scatterplot
    svg.selectAll("dot")
      .data(data)
    .enter().append("circle")
      .attr("r", 5)
      .attr("cx", function(d) { return x(d.day); })
      .attr("cy", function(d) { return y(d.commit); })

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
}]);
