myApp.directive('draggable', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element[0].addEventListener('dragstart', scope.handleDragStart, false);
            element[0].addEventListener('dragend', scope.handleDragEnd, false);
        }
    }
});

myApp.directive('droppable', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element[0].addEventListener('drop', scope.handleDrop, false);
            element[0].addEventListener('dragover', scope.handleDragOver, false);
            element[0].addEventListener('dragleave', scope.handleDragLeave, false);
        }
    }
});

myApp.controller("FormPageController", ["$scope", "$http", '$route', "$location", "AuthFactory", "EmailFactory", "UserFactory", function($scope, $http, $route, $location, AuthFactory, EmailFactory, UserFactory) {
    console.log("Loaded: Form Page Controller");

    $scope.approveMember = function(user){
      $http.put('/newRoute/approveMember', user).then(function(){

        $http.get('/newRoute/users').then(function(data){
          $scope.userData = data.data
        })

        console.log('updated ', user.display_name, "'s auth_level")
      });
    }
    $scope.showEmail = false;
    $scope.tab = 1;
    $scope.userData = [];
    $scope.sprint2Data = [];


    //temp date thing:
    $scope.date;
    $scope.sendDate = function(date){
      $scope.date = date;
      console.log('this is the date', date);
    }

    $scope.captainArray = [{
      member_name: 'Drew',
      study: "C#"

    },
    {
      member_name: 'Joe',
      study: "Python"

    },
    {
      member_name: 'Adam',
      study: "Java"

    }

  ];



    $scope.sprintOverview = false;
    $scope.surveyResults = false;

    var user = {
        data: []
    }
    $scope.showSprintMaker = false;
    $scope.launchSprint = function(){
      confirm("Ready for Launch?");
    }

    $scope.creatingSprintButton = function() {
        $scope.showSprintMaker = true;

    }

    $scope.newButton = function(){
      $http.get('/newRoute/users').then(function(data){
        console.log('these are our users', data.data);
      });
    }
    $scope.genName = function(input) {
        // console.log(input);
        $scope.showNames = [];

        for (i = 0; i < input; i++) {
            var celestialArray = ["Ganymede", "Titan", "Callisto", "Io", "Luna", "Europa", "Triton", "Eris", "Titania", "2007 OR10", "Rhea", "Oberon", "Iapetus", "Makemake", "Haumea", "Charon", "Umbriel", "Ariel", "Dione", "Quaoar", "Tethys", "Sedna", "Ceres", "2002 MS4", "Orcus", "Salacia", "2013 FY27", "2002 AW197", "2003 AZ84", "V774104", "Varda", "2015 RR245", "Dysnomia", "2004 GV9", "2005 RN43", "2002 UX25", "2007 JJ43", "Varuna", "Ixion", "2007 UK126", "Chaos", "2010 KZ39", "2012 VP113", "2010 RF43", "2005 RM43", "2001 UR163", "2002 TC302", "2002 XV93", "2003 UZ413", "2008 ST291", "2010 RE64", "2010 FX86", "2006 QH181", "2014 UM33", "2004 XR190", "Vesta", "2003 VS2", "2004 TY364", "2010 VK201", "Pallas", "2014 FT71", "Enceladus", "2005 UQ513", "2003 QX113", "2014 FC69", "2002 WC19", "2010 EK139", "Miranda", "2005 TB190", "1999 DE9", "2003 FY128", "Huya", "2002 VR128", "2010 TJ", "2010 VZ98", "2011 FW62", "Hygiea", "Proteus", "2005 QU182", "2004 NT33", "1999 CD158", "2004 PF115", "2011 GM27", "1998 SN165", "2001 QF298", "2000 YW134", "1996 GQ21", "Mimas", "Vanth", "2010 TY53", "Ilmarë", "1996 TL66", "Nereid", "2004 XA192", "2001 FP185", "Interamnia", "Hiʻiaka", "2002 KX14", "Europa", "1995 SN55", "Davida", "Sylvia", "Actaea", "Cybele", "Juno", "Hyperion", "Eunomia", "Camilla", "Euphrosyne", "Psyche", "2005 RR43", "Sila", "Chariklo", "2007 RW10", "Nunam", "Bamberga", "Patientia", "2001 QC298", "Chiron", "Thisbe", "Hektor", "Ceto", "Herculina", "Doris", "Eugenia", "Phoebe", "Amphitrite", "Bienor", "Deucalion", "Diotima", "Egeria", "Fortuna", "Aurora", "Iris", "Daphne", "Themis", "Alauda", "Larissa", "Ursula", "2001 QC298 I", "Hermione", "Palma", "Metis", "Nemesis", "Hebe", "Pholus", "Bertha", "Freia", "Elektra", "Rhadamanthus", "Janus", "Aletheia", "Galatea", "Teharonhiawako", "Typhon", "Lachesis", "Winchester", "Hilda", "Namaka", "Puck", "Aegle", "Germania", "Prokne", "Stereoskopia", "Amalthea", "Agamemnon", "Kalliope", "Borasisi", "Siegena", "Elpis", "Diomedes", "Gyptis", "Aspasia", "Dioretsa", "Dido", "Chicago", "Hispania", "Eunike", "Juewa", "S/2015 (136472) 1", "Loreley", "Pretoria", "Ino", "Altjira", "Eleonora", "Laetitia", "Irene", "Julia", "Merapi", "Berbericia", "Adeona", "Nuwa", "Despina", "Sycorax", "Manwë", "Pales", "S/2007 (148780) 1", "Lomia", "Hypatia", "Sibylla", "Emma", "Nemausa", "Meliboea", "Massalia", "Isolda", "Äneas", "Vibilia", "Princetonia", "Helio", "Bononia", "Bertholda", "Minerva", "Patroclus", "Polyxo", "Melpomene", "Adorea", "Dembowska", "Comacina", "Hesperia", "Alexandra", "Pulcova", "Pabu", "Philomela", "Medea", "Arethusa", "Portia", "Achilles", "Wratislavia", "Ate", "Eukrate", "Erminia", "Papagena", "Phorcys", "Protogeneia", "Menoetius", "Desiderata", "Lucina", "Lumen", "Liguria", "Parthenope", "Lamberta", "Himalia", "Aurelia", "Dynamene", "Flora", "Boliviana", "Zelinda", "Hippo", "Aglaja", "Thule", "Undina", "Anchises", "Odysseus", "Argentina", "Aemilia", "Thia", "Marianna", "Hestia", "Kleopatra", "Klymene", "Chloris", "Sophrosyne", "Gudrun", "Deiphobus", "Leto", "Panopaea", "Sawiskera", "Johanna", "Adelheid", "Iduna", "Xanthippe", "Bellona", "Semele", "Diana", "Myrrha", "Henrietta", "Elfriede", "Artemis", "Terpsichore", "Astraea", "Galatea", "Ornamenta", "Tanete", "Hedwig", "Freda", "Ophelia", "Ulla", "Paris", "Pompeja", "Makhaon", "2006 SQ372", "Carlova", "Brixia", "Veritas", "Tisiphone", "Kalypso", "Alcathous", "Charybdis", "Circe", "Epimetheus", "Scheila", "Melete", "Antigone", "Victoria", "Mnemosyne", "Messalina", "Teucer", "Automedon", "Aegina", "Siwa", "Tauris", "Polyxena", "Athamantis", "Nestor", "Fides", "Armida", "Thalia", "Mandeville", "Harmonia", "Eucharis", "Hermentaria", "Ninina", "Marion", "Corduba", "Atalante", "Luscinia", "Rollandia", "Eva", "Ianthe", "Vanadis", "Eos", "Hohensteina", "Ani", "Troilus", "Nausikaa", "Ausonia", "Leukothea", "Kythera", "Asterope", "Euforbo", "Antilochus", "Abastumani", "Helga", "Andromache", "Kolga", "Gerlinde", "Notburga", "Aquitania", "Isis", "Urania", "21 Lutetia", "50 Virginia", "114 Kassandra", "1021 Flammario", "162 Laurentia", "401 Ottilia", "Thebe", "148 Gallia", "404 Arsinoe", "27 Euterpe", "773 Irmintraud", "62 Erato", "26 Proserpina", "345 Tercidina", "Juliet", "58 Concordia", "229 Adelinda", "379 Huenna", "103 Hera", "17 Thetis", "143 Adria", "109 Felicitas", "100 Hekate", "90 Antiope", "227 Philosophia", "Prometheus", "110 Lydia", "Elara", "72 Feronia", "Echidna", "Thorondor", "60558 Echeclus", "S/2000 (90) 1", "71 Niobe", "102 Miriam", "97 Klotho", "61 Danae", "Thalassa", "122 Gerda", "Pandora", "83 Beatrix", "32 Pomona", "Belinda", "115 Thyra", "Cressida", "135 Hertha", "84 Klio", "80 Sappho", "1001 Gaussia", "58534 Logos", "124 Alkeste", "55576 Amycus", "25 Phocaea", "Weywot", "8405 Asbolus", "112 Iphigenia", "Rosalind", "Caliban", "99 Dike", "66 Maja", "116 Sirona", "44 Nysa", "10370 Hylonome", "77 Frigga", "55 Pandora", "133 Cyrene", "79 Eurynome", "Zoe", "Naiad", "43 Ariadne", "101 Helena", "108 Hecuba", "Desdemona", "Halimede", "52975 Cyllarus", "82 Alkmene", "60 Echo", "Crantor", "Comet Hale–Bopp", "Pasiphae", "7066 Nessus", "Neso", "64 Angelina", "67 Asia", "119 Althaea", "75 Eurydike", "142 Polana", "253 Mathilde", "52872 Okyrhoe", "Bianca", "Prospero", "Setebos", "123 Brunhild", "4348 Poulydamas", "1000 Piazzia", "113 Amalthea", "Carme", "138 Tolosa", "126 Velleda", "73 Klytia", "Sao", "125 Liberatrix", "Metis", "132 Aethra", "Laomedeia", "118 Peitho", "208 Lacrimosa", "136 Austria", "131 Vala", "Cordelia", "Siarnaq", "167 Urda", "Sinope", "Psamathe", "29P/Schwassmann–Wachmann", "Lysithea", "158 Koronis", "Hidalgo", "Hydra", "Helene", "Nix", "243 Ida", "1655 Comas Solà", "Atlas", "226 Weringia", "433 Eros", "Stephano", "Albiorix", "1036 Ganymed", "1815 Beethoven", "31824 Elatus", "Perdita", "Linus", "Ananke", "Pan", "Phobos", "Telesto", "Paaliaq", "Francisco", "Calypso", "Leda", "Ferdinand", "Margaret", "149 Medusa", "Romulus", "Ymir", "Trinculo", "Cupid", "S/2004 N 1", "2002 Euler", "Adrastea", "Kiviuq", "2000 Herschel", "Tarvos", "S/2006 (624) 1", "Hektor I", "Kerberos", "2685 Masursky", "Styx", "951 Gaspra", "(65407) 2002 RP120", "Bestla", "Petit-Prince", "Deimos", "Ijiraq", "S/2002 (121) 1", "Halley", "S/2001 (107) 1", "Mab", "Erriapus", "26858 Misterrogers", "Callirrhoe", "Themisto", "Remus", "S/2003 (379) 1", "S/2003 (130) 1", "S/2004 (45) 1", "118401 LINEAR", "4179 Toutatis", "3200 Phaethon", "2P/Encke", "C/1996 B2", "81P/Wild", "Polydeuces", "17P/Holmes", "5535 Annefrank", "3753 Cruithne", "(285263) 1998 QE2", "4055 Magellan", "9969 Braille", "132524 APL", "(6178) 1986 DA", "Comet Comas Solà", "Daphnis", "9P/Tempel", "2867 Šteins", "19P/Borrelly", "Pallene", "Comet Churyumov–Gerasimenko", "(53319) 1999 JM8", "Methone", "1620 Geographos", "1862 Apollo", "(214869) 2007 PA8", "100000 Astronautica", "Dactyl", "1566 Icarus", "4769 Castalia", "(137108) 1999 AN10", "(29075) 1950 DA", "(66391) 1999 KW4", "46P/Wirtanen", "103P/Hartley", "3908 Nyx", "14827 Hypnos", "2062 Aten", "2007 CA19", "6489 Golevka", "25143 Itokawa", "Aegaeon", "2004 XP14", "(144898) 2004 VD17", "2005 YU55", "4660 Nereus", "(357439) 2004 BL86", "99942 Apophis", "S/2009 S 1", "2010 TK7", "2007 TU24", "2002 JE9", "2010 XC15", "1994 WR12", "2009 FD", "2008 HJ", "367943 Duende", "1998 KY26"];

            var randomNumber = Math.floor(Math.random() * celestialArray.length);
            $scope.showNames.push({
                captain: "no captain",
                planet: celestialArray[randomNumber],
                team: []
            });

            // console.log($scope.showNames);
            // console.log(randomNumber);
        }
    }

    $scope.updateTeamName = function(name) {
        //eventually we can cute up this confirm box, see details in updatePerson()
        if (confirm("Are you Sure you want to Change this Info?\n\n\n If you hit cancel, you will see your changes, but they have not been saved. Refreshing will restart restore previous settings.\n\n\n")) {
            $http.put('/userData/teamname', {
                    oldData: name,
                    newData: this.$data
                })
                // this.$data send to put request, make sure it updates the correct person
        } else {
            // we don't want this to refresh bc it will reset the whole random name pull
            // $route.reload();
        }
    }

    $scope.updatePerson = function(user) {
        console.log('UPDATING NAME TO: ', this.$data);
        console.log(user);

        // perhaps we'll create a custom confirm box at some point
        // so it will read "yes" and "no" and be cute or something
        // bring in Bootstrap UI with $dialog dependency
        // http://stackoverflow.com/questions/17151940/angularjs-custom-confirm-box

        // $scope.updatePerson = function(user){
        //     var msgbox = $dialog.messageBox('Are you sure?', [{label:'Yes, I\'m sure', result: 'yes'},{label:'Nope', result: 'no'}]);
        //     msgbox.open().then(function(result){
        //         if(result === 'yes') {
        //           $http.put('/userData', {oldData: user, newData: this.$data})
        //           console.log("update person " + this.$data);
        //         }
        //     });
        // };

        if (confirm("Are you Sure you want to Change this Info?\n\n\n")) {
            $http.put('/userData/teamname', {
                    oldData: user.id,
                    newData: this.$data
                })
                // this.$data send to put request, make sure it updates the correct person
        } else {
            $route.reload();
        }
    }


    //EMAIL STUFF BELOW
    $scope.emailInfo = {};
    $scope.emails = '';


    $scope.isActive = false;
    $scope.activeButton = function() {
    $scope.isActive = !$scope.isActive;
  }

  $scope.isActive1 = false;
  $scope.activeButton1 = function() {
  $scope.isActive1 = !$scope.isActive1;
  }

  $scope.isActive2 = false;
  $scope.activeButton2 = function() {
  $scope.isActive2 = !$scope.isActive2;
}

$scope.isActive3 = false;
$scope.activeButton3 = function() {
$scope.isActive3 = !$scope.isActive3;
}

$scope.isActive4 = false;
$scope.activeButton4 = function() {
$scope.isActive4 = !$scope.isActive4;
}

$scope.isActive5 = false;
$scope.activeButton5 = function() {
$scope.isActive5 = !$scope.isActive5;
}

$scope.isActive6 = false;
$scope.activeButton6 = function() {
$scope.isActive6 = !$scope.isActive6;
}

$scope.isActive7 = false;
$scope.activeButton7 = function() {
$scope.isActive7 = !$scope.isActive7;
}

$scope.isActive8 = false;
$scope.activeButton8 = function() {
$scope.isActive8 = !$scope.isActive8;
}

$scope.isActive9 = false;
$scope.activeButton9 = function() {
$scope.isActive9 = !$scope.isActive9;
}

$scope.isActive10 = false;
$scope.activeButton10 = function() {
$scope.isActive10 = !$scope.isActive10;
}

    var emailArray = [];

    $scope.addEmail = function(email) {
        var checker;
        emailArray.forEach(function(addedEmail, index) {
            if (addedEmail == email) {
                checker = index;
            }
        })

        if (checker != undefined) {
            emailArray.splice(checker, 1);
            var tempString = '';
            emailArray.forEach(function(email, index) {
                if (index != emailArray.length - 1) {
                    tempString += email + ', ';
                } else {
                    tempString += email;
                }
            })
        } else {
            // console.log('after splice:', emailArray);

            emailArray.push(email);

            var tempString = '';
            emailArray.forEach(function(email, index) {
                if (index != emailArray.length - 1) {
                    tempString += email + ', ';
                } else {
                    tempString += email;
                }
            })
        }

        console.log(tempString);
        $scope.emails = tempString;
        return tempString;
    }
    $scope.allEmails = function() {
        var emailFunction = EmailFactory.allEmails()
        $scope.emailInfo.emails = emailFunction($scope.userData, $scope.emailInfo);
    };

    $scope.emailSent = false;
    var getData = UserFactory.getData();

    $scope.email = EmailFactory.sendEmail();

    $scope.sendEmail = function(emailObj){
      $scope.email(emailObj);
      $scope.emailInfo = {};
      $scope.emailForm.$setPristine(); //TODO: fix weird error?
      $scope.emailForm.$setUntouched();

    }

    //EMAIL POP OUT TRIAL - NOT WORKING
    // $scope.emailPop = function(){
    //   console.log('this is emailSent before change:', $scope.emailSent);
    //   $scope.emailSent = true;
    //   console.log('this is emailSent after change:', $scope.emailSent);
    //   var timer = setTimeout(showChanger, 3000);
    //   function showChanger(){
    //     $scope.$apply(function() {
    //         $scope.emailSent = false;
    //     });
    //   }
    // }


    // getData('users').then(function(data) {
    //     // console.log(data);
    //     $scope.userData = data;
    //     // $scope.userData.push(data);
    //     console.log("$scope.userData in getUsers(): ", $scope.userData);
    // });

    $http.get('/newRoute/users').then(function(data){
      $scope.userData = data.data;
    })

    // getData('sprint2').then(function(data) {
    //     // console.log(data);
    //     $scope.sprint2Data = data;
    //     for (i = 0; i < $scope.sprint2Data.length; i++) {
    //         if ($scope.sprint2Data[i].member_score == 100) {
    //             $scope.captainArray.push($scope.sprint2Data[i]);
    //         }
    //     }
    //     // console.log("Captains: ", $scope.captainArray);
    // });



    // SORTING HELL vvvvv

    // DREWS CODE :D
    $scope.handleDragStart = function(e) {
        this.style.opacity = '0.4';

        e.dataTransfer.setData('memRow', this.getAttribute('id'));
        // console.log('DRAG START:', this.geztAttribute('id'));
    };

    $scope.handleDragLeave = function(e) {
        console.log('LEFT DRAG AREA');
        // console.log('THIS:', this);
        console.log('EVENT:', e);
        this.style.opacity = 1.0;

        // if (this.getAttribute('id') == 'dropBox') {
        //     this.style.background = 'white';
        // }
        // this.style.opacity = '1.0';
    }
    $scope.handleDragEnd = function(e) {
        this.style.opacity = '1.0';
        $scope.$apply(function() {
            // $scope.dragState = 'notDraggingOver test'
        });
        //consoleDiv.style.opacity = '1.0'
    };


    $scope.handleDrop = function(e) {
        // console.log('WTF?!!?!?@#?!#?!@?#!@#', this);
        var div = this;
        e.preventDefault();
        e.stopPropagation();
        var dataText = e.dataTransfer.getData('memRow');

        // this.style.background = 'none';
        this.style.opacity = '1.0';
        console.log("DROPPED: ", dataText, "into: ", this.getAttribute('id'));
        var tempString = this.getAttribute('id');


        $scope.$apply(function() {

                  //TODO:
                  //check captian list to see if they are captian
                  //if captian -> change name
                  //if player -> change number, planet.team


            $scope.showNames.forEach(function(object, i) {
              if (dataText.substring(0,6) == "member"){
                console.log('gottem')
                if (object.planet == tempString) {
                    $scope.showNames[i].team.push(dataText.substring(6));
                    console.log('current Team:', $scope.showNames[i].team);
                    $scope.userData.forEach(function(captian, i) {

                        if (captian.display_name == dataText.substring(6)) {
                            $scope.userData.splice(i, 1);
                        }
                    })
                }
              }else {


                if (object.captain == "no captain") {

                    if (object.planet == tempString) {
                        $scope.showNames[i].captain = dataText;
                        $scope.captainArray.forEach(function(user, i) {
                            console.log(user.member_name, "=?=", dataText);
                            if (user.member_name == dataText) {
                                $scope.captainArray.splice(i, 1);
                            }
                        })
                    }
                }
              }
            })
        });
    };

    // $scope.deleteCaptain = function(object) {
    //     getData('users').then(function(userz) {
    //         var tempUserz = userz;
    //         // console.log(userz);
    //         tempUserz.forEach(function(theUser) {
    //             // console.log(theUser, object.captain);
    //
    //             if (theUser.display_name == object.captain) {
    //                 $scope.userData.push(theUser);
    //             }
    //         })
    //         $scope.showNames.forEach(function(planet, i) {
    //             if (object.planet == planet.planet) {
    //                 $scope.showNames[i].captain = 'no captain';
    //             }
    //         })
    //     })
    // }
    $scope.deleteCaptain = function(object) {
        getData('sprint2').then(function(userz) {
            var tempUserz = userz;
            // console.log(userz);
            tempUserz.forEach(function(theUser) {
                // console.log(theUser, object.captain);

                if (theUser.member_name == object.captain) {
                    $scope.sprint2Data.push(theUser);
                }
            })
            $scope.showNames.forEach(function(planet, i) {
                if (object.planet == planet.planet) {
                    $scope.showNames[i].captain = 'no captain';
                }
            })
        })
    }

    $scope.handleDragOver = function(e) {
        console.log('DRAGGING OVER DROPPABLE!!!!');
        // if (this.getAttribute('class') == 'teamNameRow') {
            this.style.opacity = '0.5';


        e.preventDefault(); // Necessary. Allows us to drop.
        e.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.
        $scope.$apply(function() {
            // $scope.dragState = 'draggingOver test'
        });
        return false;
    };


}]);
