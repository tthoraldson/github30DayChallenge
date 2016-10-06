myApp.controller("DataPageController", ["$scope", "$http", "$location", 'AuthFactory', 'UserFactory', function($scope, $http, $location, AuthFactory, UserFactory) {
    console.log("Loaded: Data Page Controller");

    $scope.sprint1 = false;
    $scope.sprint2 = false;
    $scope.sprint3 = false;


//5 players
var testTeam = [
         {'day': 1, 'commit': 10},
         {'day': 2, 'commit': 10},
         {'day': 3, 'commit': 10},
         {'day': 4, 'commit': 10},
         {'day': 5, 'commit': 10},
         {'day': 6, 'commit': 10},
         {'day': 7, 'commit': 10},
         {'day': 8, 'commit': 10},
         {'day': 9, 'commit': 10},
         {'day': 10, 'commit': 10},
         {'day': 11, 'commit': 10},
         {'day': 12, 'commit': 10},
         {'day': 13, 'commit': 10},
         {'day': 14, 'commit': 10},
         {'day': 15, 'commit': 10},
         {'day': 16, 'commit': 10},
         {'day': 17, 'commit': 10},
         {'day': 18, 'commit': 10},
         {'day': 19, 'commit': 10},
         {'day': 20, 'commit': 10},
         {'day': 21, 'commit': 10},
         {'day': 22, 'commit': 10},
         {'day': 23, 'commit': 10},
         {'day': 24, 'commit': 10},
         {'day': 25, 'commit': 10},
         {'day': 26, 'commit': 10},
         {'day': 27, 'commit': 10},
         {'day': 28, 'commit': 10},
         {'day': 29, 'commit': 10},
         {'day': 30, 'commit': 10}
       ]



    var getData = UserFactory.getData();
    // counter for tabbed html views in main pages
    // function test(){
    //
    // $http.post('/userData/daily', {uname: 'andrewwiskus', date: '2016-08-27'}).then(function(data){
    //   console.log('this is the 30 days of commit data after 2016-08-27', data.data)
    //   });
    // }
    // test();

    function updateLawn(email) {
        getData('users').then(function(users) {

            users.forEach(function(user) {
                if (user.email == email) {
                    $http.put('/userData/lawn/update', user).then(function() {
                        console.log('deleted user data and replaced with current scrapey')
                    })
                } else {
                    console.log('HEY HEY HEY UM, the email you entered didnt match any in db')
                }
            })
        })
    }


    updateLawn('coreypeck@gmail.com');

    // var testUser = [
    //   {
    //     display_name: "test member",
    //     github: "testgithub",
    //     email: "testemail@gmail.com",
    //     github_url: "https://github.com/test",
    //     language: {
    //       //ex:
    //       sprint1: "Java",
    //       sprint2: "iOS"
    //       },
    //     team: {
    //       //ex:
    //       sprint1: "linus",
    //       sprint2: "Meto"
    //       },
    //     sprintHistory: ['sprint1', 'sprint2'],
    //     lawn: []
    //   }]

    function User(id, auth_level, display_name, email, github_url, profile_photo, user_id, language, team, lawn, sprintHistory) {
        this.id = id;
        this.auth_level = auth_level;
        this.display_name = display_name;
        this.email = email;
        this.github_url = github_url;
        this.profile_photo = profile_photo;
        this.user_id = user_id;
        this.github = github_url.substring(19);
        this.language = language;
        this.team = team;
        this.lawn = lawn;
        this.sprintHistory = sprintHistory;
    }

    $scope.userData = [];


    function buildUserData() {

        getData('users').then(function(uData) {
            var tempLawn = [];
            var tempArray = [];

            //TODO:
            var language = ['JAVAROX']

            getData('user_lawns').then(function(lData) {
                uData.forEach(function(user) {

                    var id = user.id
                    var auth_level = user.auth_level
                    var display_name = user.display_name
                    var email = user.email
                    var github_url = user.github_url
                    var profile_photo = user.profile_photo
                    var user_id = user.user_id

                    var sprintHistory = [{
                        sprint: 'sprint1',
                        start_date: '2016-08-27'
                    }, {
                        sprint: 'sprint1',
                        start_date: '2016-09-30'
                    }];
                    var team = {
                        sprint1: 'linus',
                        sprint2: 'meto'
                    }

                    lData.forEach(function(commit) {

                        if (user.github_url.substring(19) == commit.github) {
                            tempLawn.push({
                                date: commit.date,
                                commits: commit.commits
                            })
                        }
                    })
                    tempArray.push(new User(id, auth_level, display_name, email, github_url, profile_photo, user_id, language, team, tempLawn, sprintHistory))
                    tempLawn = [];
                });

                $scope.userData = [];
                $scope.userData = tempArray;
                console.log('All info on current members in database', $scope.userData);

            })
        });
    }

    buildUserData();



    // function dataForEachMember(db){
    //   var dataObject = [];
    //   var userNames = [];
    //
    //   getData(db).then(function(data){
    //
    //     if(db == 'user_lawns'){
    //     data.forEach(function(obj){
    //       userNames.push(obj.git  hub)
    //     });
    //     userNames = _.uniq(userNames)
    //     console.log(userNames);
    //     };
    //
    //   });
    //
    //
    // }
    // dataForEachMember('user_lawns')



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
                        // do nothing
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

            var data2 = [{
                "day": 1,
                'commit': 30
            }, {
                'day': 2,
                'commit': 50
            }, {
                'day': 3,
                'commit': 80
            }, {
                'day': 4,
                'commit': 60
            }, {
                'day': 5,
                'commit': 70
            }, {
                'day': 6,
                'commit': 30
            }, {
                'day': 7,
                'commit': 90
            }, {
                'day': 8,
                'commit': 100
            }, {
                'day': 9,
                'commit': 20
            }, {
                'day': 10,
                'commit': 10
            }];

            var linus = [
              {'day': 0, 'commit': 10},

            ]

            var dataArray = [data, data2];


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

            // Scale the range of the data
            x.domain(d3.extent(data, function(d) {
                return d.day;
            }));
            // be sure these are set to create the x/y axises based on the largest data set
            y.domain([0, d3.max(data2, function(d) {
                return d.commit;
            })]);


            ///////////////////////////////////////
            //  CODE BELOW APPENDS THE LINE      //
            ///////////////////////////////////////
            // Add the valueline path.
            // $color = d3.scale.category20b();

            var colorI = 0;
            // var colorArray = ['#34a99a', '#1f655c', '#0a211e',
            // '#48b1a4','#70c2b8','#14433d','#99d4cc','#c2e5e0','#29877b','#eaf6f4'];

            var colorArray = ['#492058','#f6b1ed','#94f6ef','#1f655c','#0bc1bc'];

            $scope.showLine = function(id) {
                d3.select('path.line' + id).remove();
                d3.selectAll('circle.dataPoint' + id).remove();
            }
            $scope.hideData = function() {
                $scope.dataIsShowing = false;
                for (i = 0; i < dataArray.length; i++) {
                    d3.select('path.line' + i).remove();
                    d3.selectAll('circle.dataPoint' + i).remove();
                }
            }
            $scope.dataIsShowing = false;
            $scope.showData = function() {
                $scope.dataIsShowing = true;
                dataArray.forEach(function(data, index) {

                    var lineColor = colorArray[colorI];
                    colorI++;
                    if (colorI == colorArray.length) {
                        colorI = 0;
                    }

                    svg.append("path")
                        .attr("class", "line" + index)
                        .attr("d", valueline(data))
                        .style("stroke", lineColor)

                    // draw the scatterplot
                    svg.selectAll("dot")
                        .data(data)
                        .enter().append("circle")
                        .attr("class", "dataPoint" + index)
                        .attr("r", 3)
                        .attr("cx", function(d) {
                            return x(d.day);
                        })
                        .attr("cy", function(d) {
                            return y(d.commit);
                        })
                })
            }



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



    $scope.clickedSprint = function(sprintTitle) {
        console.log('clicked on: ', sprintTitle);
        $scope.sprintHistory.forEach(function(sprint) {
            if (sprint.title == sprintTitle) {
                $scope.currentSprintOpen = sprintTitle;
            }
        });
    }

}]); // end controller
