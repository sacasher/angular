(function() {
  'use strict';
  angular.module('LunchCheck',[])
    .controller("LunchController",LunchController);

  LunchController.$inject = ['$scope'];

  function LunchController($scope) {
    $scope.menu= ""; 
    $scope.border= "0";
    $scope.boxColor= "";
    $scope.result= "";
    $scope.check= function() {
      var content = $scope.menu;
      var result = "";
      $scope.border="2";
      if (content.replace(/,/g," ").trim().length < 1) {
        $scope.boxColor="red";
        result = "Please enter data first";
      }else{
        var array;
        array = content.split(',');
        if (array.length < 4) {
          result = "Enjoy!";
        }else{
          result = "Too much!";
        }
        $scope.boxColor="green"
      }
      $scope.result=result;
    };
  }
})();
