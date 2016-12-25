angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.controller('HomeCtrl', function($scope) {
  $scope.openSkill = function ($event) {
    console.log($event);
  }
});
