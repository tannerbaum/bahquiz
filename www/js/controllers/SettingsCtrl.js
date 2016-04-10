app.controller('SettingsCtrl', ['$scope', '$ionicModal','$state','userFactory', function($scope,$ionicModal,$state,userFactory) {
    
    $scope.confirmLogout = function(){
        userFactory.logoutUser();
        $state.go('tab.profile');
    }
    
  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
    
}])