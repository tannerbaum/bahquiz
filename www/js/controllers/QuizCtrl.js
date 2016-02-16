app.controller('QuizCtrl', ['$scope', 'questionsService', function($scope, questionsService){
    
    $scope.start = function(){
        $scope.id = 0;
        $scope.finished = false;
        $scope.inProgress = true;
        $scope.getQuestion();
    }
    
    $scope.reset = function(){
        $scope.inProgress = false;
        $scope.score = 0;
    }
    
    $scope.getQuestion = function(){
        var question = questionsService.getQuestion($scope.id);
        if(question){
            $scope.question = question.question; //Any questions? lol
            $scope.options = question.options; 
            $scope.answer = question.answer; 
        } else {
            $scope.finished = true;
        }
    }
    
    $scope.checkAnswer = function(item){
        console.log(item);
        
        var ans = angular.element(item);
        console.log (ans);
        
        if(ans == $scope.answer){ //formally $scope.options[$scope.answer]
            console.log("correct");
            $scope.score++;
            $scope.correctAns = true;
        } else {
            $scope.correctAns = false;
            console.log("incorrect");
        }
        
        $scope.answerMode = false;
    }
    
    $scope.nextQuestion = function(){
        $scope.id++;
        $scope.getQuestion();
    }
    
    $scope.chooseAns = function(){
        console.log("nothing");
    }
    
    $scope.reset();
}])