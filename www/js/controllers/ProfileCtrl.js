app.controller('ProfileCtrl', ['$scope', '$timeout','userFactory', function($scope,$timeout,userFactory) {

    $scope.username;
    $scope.password;
    $scope.users;
    $scope.scores;
    $scope.userScore = 0; //will later use as percentage
    $scope.userLevel;
    $scope.userIndex;
    $scope.userpercent = 0;
    $scope.first = false;
    
    getUsers();
    
    if(userFactory.getLoggedIn == false){ // this needs to be a constant check  
        $scope.signedIn = false;
    }
    
    $scope.$on("$ionicView.enter", function() {
        console.log("bingo");
        // $scope.first = false;
        getUsers();        
        $timeout(function() {
            updateBar();
        }, 500);
    });

    $scope.register = function(){
        var i = 0;
        var registered;
        
        $scope.username = document.getElementById("username").value;
        $scope.password = document.getElementById("password").value;
        
        while($scope.users[i] != null){
            if($scope.username == $scope.users[i].username){
                    alert("User already exists!");
                    registered = true;
                    break;
            }
            i++;
        }
        
        $scope.first = true;
        $scope.userIndex = i;
        console.log($scope.userIndex);
        
        if(registered != true){
            $scope.signedIn = true;
            userFactory.register($scope.username, $scope.password);
            $scope.userScore = 0;
            updateBar();
        }
    }
    
    // $scope.refresh = function(){
    //     var i = 0;
    //     // getUsers(); //is this useful
    //     console.log("before update" + $scope.userIndex);
    //     while(i < $scope.users.length){
    //         if($scope.username == $scope.users[i].name){
    //                 $scope.userIndex = i; //look at this
    //                 console.log("after update" + $scope.userIndex);
    //                 break;
    //         }
    //         i++;
    //     }
    //     updateBar();
    // }
    
    $scope.authenticate = function(){
        var i = 0;
        // var score;
        
        $scope.username = document.getElementById("username").value;
        $scope.password = document.getElementById("password").value;
        
        while(i < $scope.users.length){
            console.log("name is: " + $scope.username);
            
            console.log($scope.users[i].name);
            console.log($scope.users[i].pass);
            if($scope.username == $scope.users[i].name && $scope.password == $scope.users[i].pass){
                    console.log("user match");
                    $scope.signedIn = true;
                    // score = $scope.users[i].totalscore;
                    $scope.userIndex = i; //look at this
                    console.log($scope.userIndex);
                    $scope.userScore = $scope.users[$scope.userIndex].totalscore;
                    updateBar();
                    userFactory.setUser($scope.username,$scope.password,$scope.userScore);
                    break;
            }
            i++;
        }
        
        if($scope.signedIn != true){
            //somehow display the username is incorrect
            alert("Wrong username or Password");
        }else{
            $scope.first = false;
        }
    }

    function updateBar() {
        var elem = document.getElementById("progressBar"); 
        var width = 0;
        var interval = setInterval(frame, 10);
        var score;
        
        // alert($scope.first);
        //supposed to be true
        
        if($scope.first == true){
            console.log("first");
            score = 0;
            $scope.first = false;
        }else{
            score = $scope.users[$scope.userIndex].totalscore;
            console.log("second, score: " + score );
            if(score >= 1400){ //could replace with constants
                $scope.level = 5;
                $scope.userpercent = score % 1400;
            }else if(score >= 900){
                $scope.level = 4;
                $scope.userpercent = score % 900;
            }else if(score >= 500){
                $scope.level = 3;
                $scope.userpercent = score % 500;
            }else if(score >= 200){
                $scope.level = 2;
                $scope.userpercent = score % 200;
            }else if(score >= 100){
                $scope.level = 1;
                $scope.userpercent = score % 100;
            }else{
                $scope.level = 0;
                $scope.userpercent = score;
                console.log("updated");
            }           
            
        }
        
            function frame() {
                console.log($scope.userpercent);
                if (width >= $scope.userpercent) { // this will be user progress number
                    clearInterval(interval);
                } else {
                    width++; 
                    elem.style.width = width + '%'; 
                    document.getElementById("label").innerHTML = width * 1 + '%';
                }
            } 
        

    }
 
    function getUsers(){
        userFactory.getList()
            .then(function (response) {
                $scope.users = response.data.users;
            }, function (error) {
                $scope.status = 'unable to load users in controller: ' + error.message;
            });
    }
}])