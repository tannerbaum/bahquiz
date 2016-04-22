app.controller('ModulesCtrl', ['$scope','modFact','quizIndexFactory','userFactory', '$http', function($scope, modFact, quizIndexFactory, userFactory, $http){
    $scope.moduleSet;
    $scope.status;
    
    getModules();
    checkLogin();
      
    function checkLogin(){
        var status = userFactory.getLoggedIn();
        if(status == true){
            $scope.loggedIn = true;
        }
    }
      
    function getModules(){
        modFact.getList()
            .then(function (response) {
                $scope.moduleSet = response.data.modules;
            }, function (error) {
                $scope.status = 'unable to load modules in controller: ' + error.message;
            });
    }
    
    $scope.openLesson = function(id){
        quizIndexFactory.setModule(id); //this is the cross controller variable sharing
    }
}]);