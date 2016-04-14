//I recognize that this controller has become Frakenstein-like with all the injections. 
//This was initially a shortcoming of my knowlege of the potential of injections and services,
//and later a time issue. This controller would probably be the first thing I cleaned up if I went back. 
app.controller('QuizCtrl', ['$scope', 'questionFactory', 'quizIndexFactory','lessonFact','userFactory', 'scoreFact' , function($scope, questionFactory, quizIndexFactory, lessonFact, userFactory, scoreFact){

    var quizIndex = quizIndexFactory.getQuizIndex();
    $scope.questionSet;
    $scope.status;
    $scope.videoLink;
    $scope.lesson;
    $scope.lessonIndex;
    $scope.mod;
    $scope.selection;
    
    getQuestions();
    
    function getQuestions(){
        questionFactory.getById(quizIndex)
            .then(function(quiz){
                $scope.questionSet = quiz.data.questions;
                findPlace();
            }, function(error){
                $scope.status = 'unable to load modules in QuizCtrl.js: ' + error.message;
            });
    }
    
    function findPlace(){ // LOOK AT THIS METHOD
        var temp,i;
        $scope.lesson = $scope.questionSet[0].lessonId;
        
        lessonFact.getLesson($scope.lesson) //change this because right now the ID is doing nothing
            .then(function(response){
                temp = response.data.lessons;
                
                //Maybe this would be best suited for inside the service
                for(i = 0; i < temp.length; i++){
                    if(temp[i].id == $scope.lesson){
                        $scope.mod = temp[i].moduleId;
                        $scope.lessonIndex = i;
                        console.log("does it print?");
                        console.log($scope.lessonIndex);
                        break;
                    }
                }
                
                console.log("scope.mod is");
                console.log($scope.mod);
                getVid();
            }, function(error){
                $scope.status = 'unable to find module in QuizCtrl.js: ' + error.message;
            });
    }
    
    function getVid(){
        var temp;
        
        lessonFact.getLesson($scope.lesson) //change this because right now the ID is doing nothing
            .then(function (response) {
                temp = response.data.lessons;
                console.log("error here");
                console.log(temp);
                console.log($scope.lessonIndex);
                $scope.videoLink = temp[$scope.lessonIndex].lessonvid;
            }, function (error) {
                $scope.status = 'unable to load lessons in QuizCtrl.js: ' + error.message;
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
            // scoreFact.updateScore($scope.mod,$scope.lesson,$scope.score);
            userFactory.addPoints($scope.score); // is this working?
        }
        
    }
    
    $scope.checkAnswer = function(test){
        console.log($scope.selection);
        
        if($scope.selection == $scope.answers[$scope.answer]){ 
            console.log("correct");
            $scope.score++;
            $scope.correctAns = true;
        } else {
            $scope.correctAns = false;
            console.log("incorrect");
        }
        
        $scope.questionNum++; 
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