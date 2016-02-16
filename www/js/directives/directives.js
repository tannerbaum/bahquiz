angular.module('bahquiz.directives', ['bahquiz.services'])

.directive('module', function(){
 	return {
    restrict: 'E',
    scope: {
      info: '='
    },
    templateUrl: 'js/directives/module-dir.html'
    };
})
  
.directive('quiz',['quizFactory', function(quizFactory){
    return {
    restrict: 'E',
    scope: {
        // info: '='
    },
    templateUrl: 'js/directives/question-dir.html',
    link: function(scope, element, attrs){ //"Directives that want to modify the DOM typically use the link opion" - docs
        scope.start = function() {
            scope.id = 0; //current question, maybe I can use this index to server data to questions later?
            scope.finished = false;
            scope.inProgress = true;
            scope.getQuestion();
        };
        
        scope.reset = function() {
				scope.inProgress = false;
				scope.score = 0;
		};
        
        scope.getQuestion = function() {
            var question = quizFactory.getQuestion(scope.id);
            if(question) {
                scope.question = question.question;
                scope.options = question.options;
                scope.answer = question.answer; 
            } else {
                scope.finished = true;
            }
        };
        
        scope.click = function(){
            scope.active = true;
            //TODO Set others to false? 
        }
        
        scope.checkAnswer = function() {
            // Don't Understand this line
            // if(!$('li[name=answer]:active').length) return;
 
            var ans = $('li[name=answer]:active').val();
            console.log(ans);
            if(ans == scope.options[scope.answer]) {
                scope.score++;
                scope.correctAns = true;
                console.log("correct");
            } else {
                scope.correctAns = false;
                console.log("incorrect");
            }

            scope.answerMode = false;
        };
        
        scope.nextQuestion = function() {
            scope.checkAnswer();
            scope.id++;
            scope.getQuestion();
        }
        
        scope.reset();
        
    }
    };
}]);