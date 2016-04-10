app.controller('LessonsCtrl', ['$scope','lessonFact','quizIndexFactory','$http', function($scope, lessonFact, quizIndexFactory, $http){
    
    $scope.lessonSet;
    $scope.status;
    
    getLessons();
     
    function getLessons(){
        lessonFact.getList()
            .then(function (response) {
                $scope.lessonSet = response.data.lessons;
            }, function (error) {
                $scope.status = 'unable to load lessons in controller: ' + error.message;
            });
    }
    
    $scope.openQuiz = function(quizID){
        //replace with a JSON parse of the selected module ID
        // You will need to use a value attr to attach each module with its ID, and then grab the
        // data in the value attr and put it here. You will have some problems isolating the module
        console.log("open quiz");
        quizIndexFactory.setQuizIndex(quizID); //this is the cross controller variable sharing
    }
}]);