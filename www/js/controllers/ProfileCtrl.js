app.controller('ProfileCtrl', ['$scope', function($scope) {

    $scope.register = function(){
        
    }
    
    $scope.authenticate = function(){
        $scope.signedIn = true;
        updateBar();
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
}])