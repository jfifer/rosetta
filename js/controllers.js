var rosettaCtrl = angular.module('rosettaCtrl', []);

rosettaCtrl.controller('homeController', function ($rootScope, $scope, Auth, Portal, Vm) {
  $scope.loggedIn = false;
  $scope.username = "";
  $scope.featureServers = [];
  $scope.selectedServers = [];

  $scope.contexts = [];
  $scope.selectedContexts = [];

  $scope.startDate = "";

  $scope.getContexts = function(fs) {
    Vm.query({action: "context", id: fs}, function(res) {
      $scope.contexts = res;
    });
  };

  $scope.getFeatureServers = function() {
    Vm.query({action: "featureServers"}, function(res) {
      $scope.featureServers = res;
    }); 
  };

  $scope.inSelected = function(obj, type) {
    selected = [];
    switch(type) {
      case "server" :
        selected = $scope.selectedServers;
        break;
      case "context" :
        selected = $scope.selectedContexts;
        break;
      default: break;
    }
    if(selected.indexOf(obj) >= 0) {
      return true;
    }
    return false;
  }

  $scope.ctxSelectionChanged = function(ctx) {
    idx = $scope.selectedContexts.indexOf(ctx);
    if(idx >= 0) {
      $scope.selectedContexts.splice(idx, 1);
    } else {
      $scope.selectedContexts.push(ctx);
    }
  };

  $scope.fsSelectionChanged = function(fs) {
    idx = $scope.selectedServers.indexOf(fs);
    if(idx >= 0) {
      $scope.selectedServers.splice(idx, 1);
    } else {
      $scope.selectedServers.push(fs);
    }

    $scope.getContexts($scope.selectedServers);
  };

  $scope.$on("logIn", function(event, args) {
    $scope.doAuth(args.res);
  });

  $scope.doAuth = function(res) {
    if(parseInt(res.uid) !== -1) {
      $scope.loggedIn = true;
      $scope.username = res.username;
      $scope.getFeatureServers();
      $scope.getContexts();
    } else {
      $scope.loggedIn = false;
    }
  };

  $scope.logout = function() {
    Auth.post(function(res){
      $scope.doAuth(res);
    });
  };

  $scope.init = function() {
    Auth.get(function(res) {
      $scope.doAuth(res);
    });
  };
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
