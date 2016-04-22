app.controller('LessonsCtrl', ['$scope','lessonFact','scoreFact','quizIndexFactory','userFactory','$http','$q', function($scope, lessonFact,scoreFact, quizIndexFactory, userFactory, $http, $q){
    
    $scope.lessonSet;
    $scope.scoreSet;
    $scope.status;
    $scope.scoreArray
    $scope.modID; 
    $scope.filteredLessons = [];
    
    getLessons();
    
    function getLessons(){
        lessonFact.getList()
            .then(function (response) {
                $scope.lessonSet = response.data.lessons;   
                var modID = quizIndexFactory.getModule();               
                var promise = asyncFilter(modID);
                promise.then(function(newList){
                    $scope.lessonSet = newList;
                },function(failure){
                    console.log(failure);
                }); 
                 
                getScores();
            }, function (error) {
                $scope.status = 'unable to load lessons in controller: ' + error.message;
            });
    }
    
    function asyncFilter(id){
        return $q(function(resolve,reject){
            setTimeout(function(){
                if(filter(id)){
                    resolve($scope.filteredLessons);
                } else {
                    reject("I don't know man");
                }
            }, 1000);
        });
    }
    
    function filter(id){
        var i;
        for(i = 0; i < $scope.lessonSet.length; i++){
            if($scope.lessonSet[i].moduleId == id){
                $scope.filteredLessons.push($scope.lessonSet[i]);
            }
        }
        
        return true;        
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
    
    function checkScore(id){
        return $scope.scoreArray(id);
    }
    
    function buildArray(){
        var items;
        var user = userFactory.getUser();
        $scope.scoreArray = [$scope.lessonSet.length];
        for(var i = 0; i < $scope.lessonSet.length; i++){
            $scope.scoreArray[i] = -1;
            for(var j = 0; j < $scope.scoreSet.length; j++){
                if($scope.scoreSet[j].lesson_id == (i + 1) && $scope.scoreSet[j].user_name == user){
                    $scope.scoreArray[i] = $scope.scoreSet[j].score;
                    break;
                }
            }
        }
        
        items = document.getElementsByClassName("lessonCard");
        for(var j=0; j < items.length; j++ ){
            var x = items[j].getElementsByClassName("scoreDisplay")[0];
            if(x.getElementsByTagName('span')[0].innerHTML == -1){
                x.style.display = 'none';
            }
        }
    }
    
    $scope.openQuiz = function(lessonID){
        if($scope.scoreArray[lessonID-1] > -1){
            quizIndexFactory.stopUser();
        }else{
            quizIndexFactory.setQuizIndex(lessonID);
        }     
    }
}]);