app.controller('ProfileCtrl', ['$scope', '$timeout','userFactory', function($scope,$timeout,userFactory) {

    $scope.username;
    $scope.password;
    $scope.users;
    
    getUsers();

    $scope.register = function(){
        var i;
        var registered;
        
        $scope.username = document.getElementById("username");
        $scope.password = document.getElementById("password");
        
        while($scope.users[i] != null){
            if($scope.username == $scope.users[i].username){
                    //somehow print the user exsits
                    registered = true;
                    break;
            }
            i++;
        }
        
        if(registered != true){
            //post request
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
                    console.log(userFactory.getUser());
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
}])