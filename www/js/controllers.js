angular.module('starter.controllers', [])

.controller('AppCtrl', function ($rootScope) {
  localforage.getItem('skill', function (err, value) {
    $rootScope.loadDataFinish = true;

    if (value) {
      $rootScope.skillInfo = value;
    } else {
      $rootScope.skillInfo = [];
    }
  });
})

.controller('HomeCtrl', function ($scope, $state) {
  $scope.loadDataFinish = false;
  init();



  function init() {
    localforage.getItem('skill', function (err, value) {
      $scope.loadDataFinish = true;

      if (value) {
        $scope.loadDataFinish = true;
        $scope.skillInfo = value;
      } else {
        $scope.skillInfo = [];
      }
      $scope.$apply();
    });
  }

  $scope.$on('$ionicView.beforeEnter', function() {
    init();
  });

  $scope.openSkill = function (event) {
    var id = event.srcElement.parentElement.getAttribute('id');
    $state.go('app.skill', {id: id});
  };

  $scope.canAddPoints = function (skill_id) {
    if ($scope.skillInfo[skill_id] !== undefined) {
      return $scope.skillInfo[skill_id];
    }
    return false;
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
      window.open(link.url, '_system', 'location=yes');
      return false;
    }
  }
});
