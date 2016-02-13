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
  
.directive('quiz', function(){
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
        
        scope.checkAnswer = function() {
            // Don't Understand this line
            if(!$('a[name=answer]:active').length) return;
 
            var ans = $('a[name=answer]:active').val();
 
            if(ans == scope.options[scope.answer]) {
                scope.score++;
                scope.correctAns = true;
            } else {
                scope.correctAns = false;
            }

            scope.answerMode = false;
        };
        
        scope.nextQuestion = function() {
            scope.id++;
            scope.getQuestion();
        }
        
        scope.reset();
        
    }
    };
});