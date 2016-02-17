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
    
    $scope.checkAnswer = function(){
        var ele = document.getElementsByClassName("active");
        var ans = angular.element(ele).attr('value');
        console.log ("ans is " + ans);
        
        if(ans == $scope.options[$scope.answer]){ 
            console.log("correct");
            $scope.score++;
            $scope.correctAns = true;
        } else {
            $scope.correctAns = false;
            console.log("incorrect");
        }
        
        angular.element(ele).removeClass('active');
        
        $scope.nextQuestion();
    }
    
    $scope.nextQuestion = function(){
        $scope.id++;
        $scope.getQuestion();
    }
    
    $scope.setSelected = function(idSelected){
        $scope.idSelected = idSelected;
        console.log("selected is " + idSelected);
    }
    
    $scope.reset();
}])