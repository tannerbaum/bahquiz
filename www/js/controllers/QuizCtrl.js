app.controller('QuizCtrl', ['$scope', 'questionService', 'questionFactory', 'quizIndexFactory', function($scope, questionService, questionFactory, quizIndexFactory){
    //reinject questionFactory later (in function param too)
    var quizIndex = quizIndexFactory.getQuizIndex();
    $scope.questionSet;
    $scope.status;
    
    getQuestions();
    
    function getQuestions(){
        questionFactory.getById(quizIndex)
            .then(function(quiz){
                console.log("setting quiz scope");
                $scope.questionSet = quiz.data.questions;
                // console.log($scope.questionSet[0]);
            }, function(error){
                $scope.status = 'unable to load modules in controller: ' + error.message;
            });
    }
    
    
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
        var question = $scope.questionSet[$scope.id];

        if(question){
            $scope.question = question.question_text;
            $scope.choices = [question.a,question.b,question.c,question.d]; // can later make a for loop to add if it isn't NULL for true/false
            $scope.answer = question.answer;
        } else {
            $scope.finished = true;
        }
        
    }
    
    $scope.checkAnswer = function(){
        var ele = document.getElementsByClassName("active");
        var ans = angular.element(ele).attr('value');
        console.log ("ans is " + ans);
        
        if(ans == $scope.choices[$scope.answer]){ 
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