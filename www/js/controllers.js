angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

})

.controller('HomeCtrl', function ($scope, $state) {
  var vm = this;
  vm.loadDataFinish = false;
  init();

  function init() {
    localforage.getItem('skill', function (err, value) {
      vm.loadDataFinish = true;

      if (value) {
        vm.skillInfo = value;
      } else {
        vm.skillInfo = [];
      }
    });
  }

  vm.isLoadDataFinished = function () {
    return vm.loadDataFinish;
  };

  vm.openSkill = function (event) {
    var id = event.srcElement.parentElement.getAttribute('id');
    $state.go('app.skill', {id: id});
  };

  vm.canAddPoints = function (skill_id) {
    _.forEach(vm.skillInfo, function (value, id) {
      if(skill_id === id) {
        return value;
      }
    });
  };
})

.controller('SkillCtrl', function ($scope, $state, $stateParams) {
  var id = $stateParams.id;
  $scope.$on('$ionicView.beforeEnter', function() {
    $scope.skill = _.filter(window.SKILL_TREE, {"id": parseInt(id)})[0];
    localforage.getItem('skill', function (err, value) {
      if(value){
        $scope.skillInfo = value;
      } else {
        $scope.skillInfo = [];
      }
    });

    localforage.getItem('skill.' + $scope.skill.id, function (err, value) {
      if(value){
        $scope.skillStorageInfo = value;
      } else {
        $scope.skillStorageInfo = {};
      }
    });
  });

  $scope.addItemToDone = function () {
    localforage.setItem('skill.' + $scope.skill.id, $scope.skillStorageInfo);
    if(Object.keys($scope.skillStorageInfo).length === $scope.skill.rankDescriptions.length) {
      $scope.skillInfo[id] = true;
      localforage.setItem('skill', $scope.skillInfo);
    } else {
      $scope.skillInfo[id] = false;
      localforage.setItem('skill', $scope.skillInfo);
    }
  };

  $scope.isIOS = function () {
    return ionic.Platform.isIOS();
  };

  $scope.openLink = function (link) {
    if(link.url){
      window.open(link, '_system', 'location=yes');
      return false;
    }
  }
});
