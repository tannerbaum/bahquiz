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
    
    // $scope.openLesson = function(quizID){
    //     //replace with a JSON parse of the selected module ID
    //     // You will need to use a value attr to attach each module with its ID, and then grab the
    //     // data in the value attr and put it here. You will have some problems isolating the module
    //     console.log("open quiz");
    //     quizIndexFactory.setQuizIndex(quizID); //this is the cross controller variable sharing
    // }
}]);