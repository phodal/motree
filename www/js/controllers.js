angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

})

.controller('HomeCtrl', function ($scope, $state) {
  $scope.openSkill = function (event) {
    event.srcElement.style.fill = '#2d89ef';
    var id = event.srcElement.parentElement.getAttribute('id');
    $state.go('app.skill', {id: id});
  }
})

.controller('SkillCtrl', function ($scope, $state, $stateParams) {
  var id = $stateParams.id;
  $scope.skill = _.filter(window.SKILL_TREE, {"id": parseInt(id)})[0];

  $scope.addItemToDone = function () {

  };

  $scope.isIOS = function () {
    return ionic.Platform.isIOS();
  }
});
