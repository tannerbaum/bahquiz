app.directive('module', function(){
 	return {
    restrict: 'E',
    scope: {
      info: '='
    },
    templateUrl: 'js/directives/module-dir.html'
    };
})