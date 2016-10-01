myApp.controller("FormPageController", ["$scope", "$http", "$location", "AuthFactory",  function($scope, $http, $location, AuthFactory) {
    console.log("Loaded: Form Page Controller");

    $scope.tab = 1;
    var user = {
      data: []
    }
    $scope.userData = [];

    $scope.genName = function(input){
      console.log(input);
      $scope.showNames = [];

        for (i = 0; i < input; i++){
          var celestialArray = ["Ganymede","Titan","Callisto","Io","Luna","Europa","Triton","Eris","Titania","2007 OR10","Rhea","Oberon","Iapetus","Makemake","Haumea","Charon","Umbriel","Ariel","Dione","Quaoar","Tethys","Sedna","Ceres","2002 MS4","Orcus","Salacia","2013 FY27","2002 AW197","2003 AZ84","V774104","Varda","2015 RR245","Dysnomia","2004 GV9","2005 RN43","2002 UX25","2007 JJ43","Varuna","Ixion","2007 UK126","Chaos","2010 KZ39","2012 VP113","2010 RF43","2005 RM43","2001 UR163","2002 TC302","2002 XV93","2003 UZ413","2008 ST291","2010 RE64","2010 FX86","2006 QH181","2014 UM33","2004 XR190","Vesta","2003 VS2","2004 TY364","2010 VK201","Pallas","2014 FT71","Enceladus","2005 UQ513","2003 QX113","2014 FC69","2002 WC19","2010 EK139","Miranda","2005 TB190","1999 DE9","2003 FY128","Huya","2002 VR128","2010 TJ","2010 VZ98","2011 FW62","Hygiea","Proteus","2005 QU182","2004 NT33","1999 CD158","2004 PF115","2011 GM27","1998 SN165","2001 QF298","2000 YW134","1996 GQ21","Mimas","Vanth","2010 TY53","Ilmarë","1996 TL66","Nereid","2004 XA192","2001 FP185","Interamnia","Hiʻiaka","2002 KX14","Europa","1995 SN55","Davida","Sylvia","Actaea","Cybele","Juno","Hyperion","Eunomia","Camilla","Euphrosyne","Psyche","2005 RR43","Sila","Chariklo","2007 RW10","Nunam","Bamberga","Patientia","2001 QC298","Chiron","Thisbe","Hektor","Ceto","Herculina","Doris","Eugenia","Phoebe","Amphitrite","Bienor","Deucalion","Diotima","Egeria","Fortuna","Aurora","Iris","Daphne","Themis","Alauda","Larissa","Ursula","2001 QC298 I","Hermione","Palma","Metis","Nemesis","Hebe","Pholus","Bertha","Freia","Elektra","Rhadamanthus","Janus","Aletheia","Galatea","Teharonhiawako","Typhon","Lachesis","Winchester","Hilda","Namaka","Puck","Aegle","Germania","Prokne","Stereoskopia","Amalthea","Agamemnon","Kalliope","Borasisi","Siegena","Elpis","Diomedes","Gyptis","Aspasia","Dioretsa","Dido","Chicago","Hispania","Eunike","Juewa","S/2015 (136472) 1","Loreley","Pretoria","Ino","Altjira","Eleonora","Laetitia","Irene","Julia","Merapi","Berbericia","Adeona","Nuwa","Despina","Sycorax","Manwë","Pales","S/2007 (148780) 1","Lomia","Hypatia","Sibylla","Emma","Nemausa","Meliboea","Massalia","Isolda","Äneas","Vibilia","Princetonia","Helio","Bononia","Bertholda","Minerva","Patroclus","Polyxo","Melpomene","Adorea","Dembowska","Comacina","Hesperia","Alexandra","Pulcova","Pabu","Philomela","Medea","Arethusa","Portia","Achilles","Wratislavia","Ate","Eukrate","Erminia","Papagena","Phorcys","Protogeneia","Menoetius","Desiderata","Lucina","Lumen","Liguria","Parthenope","Lamberta","Himalia","Aurelia","Dynamene","Flora","Boliviana","Zelinda","Hippo","Aglaja","Thule","Undina","Anchises","Odysseus","Argentina","Aemilia","Thia","Marianna","Hestia","Kleopatra","Klymene","Chloris","Sophrosyne","Gudrun","Deiphobus","Leto","Panopaea","Sawiskera","Johanna","Adelheid","Iduna","Xanthippe","Bellona","Semele","Diana","Myrrha","Henrietta","Elfriede","Artemis","Terpsichore","Astraea","Galatea","Ornamenta","Tanete","Hedwig","Freda","Ophelia","Ulla","Paris","Pompeja","Makhaon","2006 SQ372","Carlova","Brixia","Veritas","Tisiphone","Kalypso","Alcathous","Charybdis","Circe","Epimetheus","Scheila","Melete","Antigone","Victoria","Mnemosyne","Messalina","Teucer","Automedon","Aegina","Siwa","Tauris","Polyxena","Athamantis","Nestor","Fides","Armida","Thalia","Mandeville","Harmonia","Eucharis","Hermentaria","Ninina","Marion","Corduba","Atalante","Luscinia","Rollandia","Eva","Ianthe","Vanadis","Eos","Hohensteina","Ani","Troilus","Nausikaa","Ausonia","Leukothea","Kythera","Asterope","Euforbo","Antilochus","Abastumani","Helga","Andromache","Kolga","Gerlinde","Notburga","Aquitania","Isis","Urania","21 Lutetia","50 Virginia","114 Kassandra","1021 Flammario","162 Laurentia","401 Ottilia","Thebe","148 Gallia","404 Arsinoe","27 Euterpe","773 Irmintraud","62 Erato","26 Proserpina","345 Tercidina","Juliet","58 Concordia","229 Adelinda","379 Huenna","103 Hera","17 Thetis","143 Adria","109 Felicitas","100 Hekate","90 Antiope","227 Philosophia","Prometheus","110 Lydia","Elara","72 Feronia","Echidna","Thorondor","60558 Echeclus","S/2000 (90) 1","71 Niobe","102 Miriam","97 Klotho","61 Danae","Thalassa","122 Gerda","Pandora","83 Beatrix","32 Pomona","Belinda","115 Thyra","Cressida","135 Hertha","84 Klio","80 Sappho","1001 Gaussia","58534 Logos","124 Alkeste","55576 Amycus","25 Phocaea","Weywot","8405 Asbolus","112 Iphigenia","Rosalind","Caliban","99 Dike","66 Maja","116 Sirona","44 Nysa","10370 Hylonome","77 Frigga","55 Pandora","133 Cyrene","79 Eurynome","Zoe","Naiad","43 Ariadne","101 Helena","108 Hecuba","Desdemona","Halimede","52975 Cyllarus","82 Alkmene","60 Echo","Crantor","Comet Hale–Bopp","Pasiphae","7066 Nessus","Neso","64 Angelina","67 Asia","119 Althaea","75 Eurydike","142 Polana","253 Mathilde","52872 Okyrhoe","Bianca","Prospero","Setebos","123 Brunhild","4348 Poulydamas","1000 Piazzia","113 Amalthea","Carme","138 Tolosa","126 Velleda","73 Klytia","Sao","125 Liberatrix","Metis","132 Aethra","Laomedeia","118 Peitho","208 Lacrimosa","136 Austria","131 Vala","Cordelia","Siarnaq","167 Urda","Sinope","Psamathe","29P/Schwassmann–Wachmann","Lysithea","158 Koronis","Hidalgo","Hydra","Helene","Nix","243 Ida","1655 Comas Solà","Atlas","226 Weringia","433 Eros","Stephano","Albiorix","1036 Ganymed","1815 Beethoven","31824 Elatus","Perdita","Linus","Ananke","Pan","Phobos","Telesto","Paaliaq","Francisco","Calypso","Leda","Ferdinand","Margaret","149 Medusa","Romulus","Ymir","Trinculo","Cupid","S/2004 N 1","2002 Euler","Adrastea","Kiviuq","2000 Herschel","Tarvos","S/2006 (624) 1","Hektor I","Kerberos","2685 Masursky","Styx","951 Gaspra","(65407) 2002 RP120","Bestla","Petit-Prince","Deimos","Ijiraq","S/2002 (121) 1","Halley","S/2001 (107) 1","Mab","Erriapus","26858 Misterrogers","Callirrhoe","Themisto","Remus","S/2003 (379) 1","S/2003 (130) 1","S/2004 (45) 1","118401 LINEAR","4179 Toutatis","3200 Phaethon","2P/Encke","C/1996 B2","81P/Wild","Polydeuces","17P/Holmes","5535 Annefrank","3753 Cruithne","(285263) 1998 QE2","4055 Magellan","9969 Braille","132524 APL","(6178) 1986 DA","Comet Comas Solà","Daphnis","9P/Tempel","2867 Šteins","19P/Borrelly","Pallene","Comet Churyumov–Gerasimenko","(53319) 1999 JM8","Methone","1620 Geographos","1862 Apollo","(214869) 2007 PA8","100000 Astronautica","Dactyl","1566 Icarus","4769 Castalia","(137108) 1999 AN10","(29075) 1950 DA","(66391) 1999 KW4","46P/Wirtanen","103P/Hartley","3908 Nyx","14827 Hypnos","2062 Aten","2007 CA19","6489 Golevka","25143 Itokawa","Aegaeon","2004 XP14","(144898) 2004 VD17","2005 YU55","4660 Nereus","(357439) 2004 BL86","99942 Apophis","S/2009 S 1","2010 TK7","2007 TU24","2002 JE9","2010 XC15","1994 WR12","2009 FD","2008 HJ","367943 Duende","1998 KY26"];
          var randomNumber = Math.floor(Math.random()*celestialArray.length);
          $scope.showNames.push(celestialArray[randomNumber]);

          // as is, we have a problem with duplicates
          console.log($scope.showNames);
          console.log(randomNumber);

        }
    }

    $scope.updatePerson = function(user){
      console.log('UPDATING NAME TO: ', this.$data);
      console.log(user);

      // perhaps will will create a custom confirm box at some point
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

      if (confirm("Are you Sure you want to Change this Info?\n\n\nPlease refresh page if you hit cancel\n\n")) {
      $http.put('/userData', {oldData: user, newData: this.$data})
      // this.$data send to put request, make sure it updates the correct person

  } else {
    //do nothing
  }

    }

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

    getData('users').then(function(data) {
        console.log(data);
        $scope.userData = data;
        // console.log($scope.userData);
    });

}]);
