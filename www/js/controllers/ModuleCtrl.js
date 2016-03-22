app.controller('ModulesCtrl', ['$scope', 'quizIndexFactory', function($scope, quizIndexFactory){
    $scope.modules = [
    {
        mod_avatar: '../img/ionic.png',
        title: 'Fire Skills 101',
        quiz_num: '4 quizzes',
        mod_image: '../img/fire.jpg',
        mod_body: 'In this lesson, you will learn how to survive in the wilderness with proper fire skills.'
    }];
    
    $scope.openQuiz = function(){
        var id = 0; //replace with a JSON parse of the selected module ID
        // You will need to use a value attr to attach each module with its ID, and then grab the
        // data in the value attr and put it here. You will have some problems isolating the module
        
        quizIndexFactory.setQuizIndex(id);
    }
}]);