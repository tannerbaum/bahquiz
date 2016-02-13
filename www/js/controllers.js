angular.module('bahquiz.controllers', [])

.controller('ProfileCtrl', function($scope) {})

.controller('ModulesCtrl', ['$scope', function($scope) {
    $scope.modules = [
    {
        mod_avatar: '../img/ionic.png',
        title: 'Vessels 101',
        quiz_num: '4 quizzes',
        mod_image: '../img/vessel.jpg',
        mod_body: 'In this lesson, you will learn all kinds of interesting things like how to swab the poop deck, avoid catching scurvey  and what to do when you get that tingly feeling for your fellow patriots.'
    },
    {
        mod_avatar: '../img/ionic.png',
        title: 'Rick Astley',
        quiz_num: '1 quiz',
        mod_image: '../img/astley.jpg',
        mod_body: 'We are no strangers to love. You know the rules, and so do I. So take this quiz'
    }];
}])

.controller('QuizCtrl', function($scope) {
})

.controller('SettingsCtrl', function($scope) {})