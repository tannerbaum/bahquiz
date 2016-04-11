app.controller('QuizCtrl', ['$scope', 'questionFactory', 'quizIndexFactory','lessonFact','userFactory', function($scope, questionFactory, quizIndexFactory, lessonFact, userFactory){
    //reinject questionFactory later (in function param too)
    var quizIndex = quizIndexFactory.getQuizIndex();
    $scope.questionSet;
    $scope.status;
    $scope.videoLink = "";
    // $scope.test = {choice: x};
    
    getQuestions();
    
    function getQuestions(){
        questionFactory.getById(quizIndex)
            .then(function(quiz){
                console.log("setting quiz scope");
                $scope.questionSet = quiz.data.questions;
                getVid();
            }, function(error){
                $scope.status = 'unable to load modules in controller: ' + error.message;
            });
    }
    
    function getVid(){
        var temp;
        lessonFact.getVid($scope.questionSet[0].lessonId)
            .then(function (response) {
                temp = response.data.lessons;
                // console.log("link is");
                // console.log(temp);
                $scope.videoLink = temp[0].lessonvid;
            }, function (error) {
                $scope.status = 'unable to load lessons in controller: ' + error.message;
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
        $scope.questionNum = 0;
    }
    
    $scope.getQuestion = function(){ 
        var question = $scope.questionSet[$scope.id];

        if(question){
            $scope.question = question.question_text;
            $scope.answers = [question.a,question.b,question.c,question.d]; // can later make a for loop to add if it isn't NULL for true/false
            $scope.answer = question.answer; 
        } else {
            $scope.finished = true;
            $scope.score = ($scope.score / $scope.questionNum ) * 100;
            userFactory.addPoints($scope.score);
        }
        
    }
    
    $scope.checkAnswer = function(test){
        // console.log(test);
        
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
        
        $scope.questionNum++; 
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