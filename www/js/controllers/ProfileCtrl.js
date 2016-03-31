app.controller('ProfileCtrl', ['$scope','userFactory', function($scope,userFactory) {

    $scope.username;
    $scope.password;

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
        var i;
        
        $scope.username = document.getElementById("username");
        $scope.password = document.getElementById("password");
        
        getUsers();
        
        while($scope.users[i] != null){
            if($scope.username == $scope.users[i].username){
                if($scope.password == $scope.users[i].password){
                    $scope.signedIn = true;
                    updateBar();
                    break;
                } else{
                    //somehow display the password is incorrect
                    break;
                }
            }
            i++;
        }
        
        if($scope.signedIn != true){
            //somehow display the username is incorrect
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
                $scope.users = response.data.users; //check on this
            }, function (error) {
                $scope.status = 'unable to load users in controller: ' + error.message;
            });
    }
}])