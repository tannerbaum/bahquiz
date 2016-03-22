app.controller('QuizCtrl', ['$scope', 'questionService', 'questionFactory', 'quizIndexFactory', function($scope, questionService, questionFactory, quizIndexFactory){
    //reinject questionFactory later (in function param too)
    var quizIndex = quizIndexFactory.getQuizIndex();
    
    questionFactory.getById(quizIndex).then(function(quiz){
        $scope.quiz = quiz;
    });
    //After This, you should be ready for dealing with the parsing of the individual questions
    
    // questionFactory.success(function(data) {
    //    $scope.questionSet = data.questions;  
    // });
    
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
        var question = questionService.getQuestion($scope.id);
        if(question){
            $scope.question = question.question; // questiontext
            $scope.options = question.options; // array of answers
            $scope.answer = question.answer; //int value of correct answer
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