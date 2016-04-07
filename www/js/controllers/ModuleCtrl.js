app.controller('ModulesCtrl', ['$scope','modFact','quizIndexFactory', '$http', function($scope, modFact, quizIndexFactory, $http){
    $scope.modules = [
    {
        mod_avatar: '../img/ionic.png',
        title: 'Fire Skills 101',
        quiz_num: '4 quizzes',
        mod_image: '../img/fire.jpg',
        mod_body: 'In this lesson, you will learn how to survive in the wilderness with proper fire skills.'
    }];
    
    // moduleFactory.success(function(data) {
    //    console.log("module factory success");
    //    $scope.moduleSet = data.modules;  
    // });
    $scope.moduleSet;
    $scope.status;
    
    getModules();
     
    function getModules(){
        modFact.getList()
            .then(function (response) {
                $scope.moduleSet = response.data.modules;
            }, function (error) {
                $scope.status = 'unable to load modules in controller: ' + error.message;
            });
    }
    
    // $scope.openLesson = function(quizID){
    //     //replace with a JSON parse of the selected module ID
    //     // You will need to use a value attr to attach each module with its ID, and then grab the
    //     // data in the value attr and put it here. You will have some problems isolating the module
    //     console.log("open quiz");
    //     quizIndexFactory.setQuizIndex(quizID); //this is the cross controller variable sharing
    // }
}]);