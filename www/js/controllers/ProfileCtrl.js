app.controller('ProfileCtrl', ['$scope', '$timeout','userFactory', function($scope,$timeout,userFactory) {

    $scope.username;
    $scope.password;
    $scope.users;
    $scope.scores;
    
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
            updateBar();
        }
    }
    
    $scope.authenticate = function(){
        var i = 0;
        $scope.username = document.getElementById("username").value;
        $scope.password = document.getElementById("password").value;
        
        while(i < $scope.users.length){
            console.log("name is: " + $scope.username);
            
            console.log($scope.users[i].name);
            console.log($scope.users[i].pass);
            if($scope.username == $scope.users[i].name && $scope.password == $scope.users[i].pass){
                    console.log("user match");
                    $scope.signedIn = true;
                    updateBar();
                    userFactory.setUser($scope.username);
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
        function frame() {
            if (width >= 76) { // this will be user progress number
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