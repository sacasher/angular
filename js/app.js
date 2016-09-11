(function() {
  'use strict';
  angular.module('LunchCheck',[])
    .controller("LunchController",LunchController);

  LunchController.$inject = ['$scope'];

  function LunchController($scope) {
    $scope.menu= ""; 
    $scope.result= "";
    $scope.check= function() {
      var content = $scope.menu;
      var result = "";
      if (content.replace(/,/g," ").trim().length < 1) {
        document.getElementById("lunch-menu")
          .style.border = "2px solid red";
        document.getElementsByClassName("message")[0]
          .style.color = "red";
        result = "Please enter data first";
      }else{
        var array;
        array = content.split(',');
        if (array.length < 4) {
          result = "Enjoy!";
        }else{
          result = "Too much!";
        }
        document.getElementById("lunch-menu")
          .style.border = "2px solid green";
        document.getElementsByClassName("message")[0]
          .style.color = "green";
      }
      $scope.result=result;
    };
  }
})();
