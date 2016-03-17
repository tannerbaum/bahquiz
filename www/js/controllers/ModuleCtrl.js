app.controller('ModulesCtrl', ['$scope', function($scope){
    $scope.modules = [
    {
        mod_avatar: '../img/ionic.png',
        title: 'Fire Skills 101',
        quiz_num: '4 quizzes',
        mod_image: '../img/fire.jpg',
        mod_body: 'In this lesson, you will learn how to survive in the wilderness with proper fire skills.'
    }];
    
    $scope.mods = [
    {
        mod_avatar: '../img/ionic.png',
        title: 'Internet 101',
        quiz_num: '1 quiz',
        mod_image: '../img/internet.jpg',
        mod_body: 'If you are using this app, then you have used the internet to donwload it! But there is a lot to learn about the internet before you continue your training'
    }];
}]);