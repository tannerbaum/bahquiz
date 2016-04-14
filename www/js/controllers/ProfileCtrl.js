app.controller('ProfileCtrl', ['$scope', '$timeout','userFactory', function($scope,$timeout,userFactory) {

    $scope.username;
    $scope.password;
    $scope.users;
    $scope.scores;
    $scope.userScore; //will later use as percentage
    $scope.userLevel;
    
    
    getUsers();
    // getScores();
    
    if(userFactory.getLoggedIn == false){ // this needs to be a constant check  
        $scope.signedIn = false;
    }

    $scope.register = function(){
        var i;
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
        
        if(registered != true){
            userFactory.register($scope.username, $scope.password);
            $scope.signedIn = true;
            $scope.userScore = $scope.users[i].totalscore;
            updateBar();
        }
    }
    
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
                    $scope.userScore = $scope.users[i].totalscore;
                    updateBar();
                    userFactory.setUser($scope.username,$scope.password,$scope.userScore);
                    break;
            }
            i++;
        }
        
        if($scope.signedIn != true){
            //somehow display the username is incorrect
            alert("Wrong username or Password");
        }  
    }

    function updateBar() {
        var elem = document.getElementById("progressBar"); 
        var width = 0;
        var interval = setInterval(frame, 10);
        
        var score = $scope.userScore;
        
        if(score >= 1400){ //could replace with constants
            $scope.level = 5;
            $scope.userscore = score % 1400;
        }else if(score >= 900){
            $scope.level = 4;
            $scope.userscore = score % 900;
        }else if(score >= 500){
            $scope.level = 3;
            $scope.userscore = score % 500;
        }else if(score >= 200){
            $scope.level = 2;
            $scope.userscore = score % 200;
        }else if(score >= 100){
            $scope.level = 1;
            $scope.userscore = score % 100;
        }else{
            $scope.level = 0;
            $scope.userscore = score;
        }
        
        function frame() {
            if (width >= $scope.userscore) { // this will be user progress number
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
                console.log($scope.users[0]);
                
                // return response.data.users;
                // $scope.$apply(function(){
                //     $scope.users = response.data.users;
                // })
                // $timeout(function(){
                // $scope.users = response.data.users;
                // })
                // console.log($scope.users[0]);
            }, function (error) {
                $scope.status = 'unable to load users in controller: ' + error.message;
            });
    }
    
    // function getScores(){
    //     scoreFactory.getList()
    //         .then(function (response) {
    //             var data = response.data.users;
                
                
    //             // return response.data.users;
    //             // $scope.$apply(function(){
    //             //     $scope.users = response.data.users;
    //             // })
    //             // $timeout(function(){
    //             // $scope.users = response.data.users;
    //             // })
    //             // console.log($scope.users[0]);
    //         }, function (error) {
    //             $scope.status = 'unable to load users in controller: ' + error.message;
    //         });
    // }
}])