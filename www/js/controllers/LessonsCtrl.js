app.controller('LessonsCtrl', ['$scope','lessonFact','scoreFact','modFact','quizIndexFactory','$http', function($scope, lessonFact,scoreFact,modFact, quizIndexFactory, $http){
    
    $scope.lessonSet;
    $scope.scoreSet;
    // $scope.moduleSet;
    $scope.status;
    $scope.scoreArray
    
    getLessons();
    // getScores();
    // getModules();

     
    function getLessons(){
        lessonFact.getList()
            .then(function (response) {
                $scope.lessonSet = response.data.lessons;
                console.log("lessons set");
                getScores();
            }, function (error) {
                $scope.status = 'unable to load lessons in controller: ' + error.message;
            });
    }
    
    function getScores(){
        scoreFact.getList()
            .then(function (response) {
                $scope.scoreSet = response.data.scores;
                buildArray();
            }, function (error) {
                $scope.status = 'unable to load lessons in controller: ' + error.message;
            });
    }
    
    function buildArray(){
        $scope.scoreArray = [$scope.lessonSet.length];
        // console.log("scores set");
        // console.log($scope.scoreSet[0]);
        for(var i = 0; i < $scope.lessonSet.length; i++){
            $scope.scoreArray[i] = -1;
            for(var j = 0; j < $scope.scoreSet.length; j++){
                if($scope.scoreSet[j].lesson_id == (i + 1)){
                    $scope.scoreArray[i] = $scope.scoreSet[j].score;
                    break;
                }
            }
        }
    }
    
    // function getModules(){
    //     lessonFact.getList()
    //         .then(function (response) {
    //             $scope.moduleSet = response.data.lessons;
    //         }, function (error) {
    //             $scope.status = 'unable to load lessons in controller: ' + error.message;
    //         });
    // }
    
    $scope.openQuiz = function(quizID){
        //replace with a JSON parse of the selected module ID
        // You will need to use a value attr to attach each module with its ID, and then grab the
        // data in the value attr and put it here. You will have some problems isolating the module
        console.log("open quiz");
        quizIndexFactory.setQuizIndex(quizID); //this is the cross controller variable sharing
    }
}]);