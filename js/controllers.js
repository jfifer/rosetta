var rosettaCtrl = angular.module('rosettaCtrl', []);

rosettaCtrl.controller('homeController', function ($rootScope, $scope, Auth, Portal) {
  $scope.loggedIn = false;
  $scope.username = "";

  $scope.$on("logIn", function(event, args) {
    $scope.doAuth(args.res);
  });

  $scope.doAuth = function(res) {
    if(parseInt(res.uid) !== -1) {
      $scope.loggedIn = true;
      $scope.username = res.username;
    } else {
      $scope.loggedIn = false;
    }
  }

  $scope.logout = function() {
    Auth.post(function(res){
      $scope.doAuth(res);
    });
  }

  $scope.init = function() {
    Auth.get(function(res) {
      $scope.doAuth(res);
    });
  }
})
rosettaCtrl.controller('authController', function ($rootScope, $scope, Auth) {
  $scope.login = function(auth) {
    if(angular.element($('.login')).hasClass("ng-valid")) {
      auth.password = sha1(auth.password);
      Auth.post({}, auth, function(res) {
        $rootScope.$broadcast("logIn", { res });
      });
    }
  }
});
