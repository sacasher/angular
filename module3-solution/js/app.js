(function() {
  'use strict';
  angular.module('NarrowItDownApp',[])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");
  
  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'found.html',
      scope: {
        items: '<',
        onRemove: '&'
      },
      controller: FoundDirectiveController,
      controllerAs: 'found',
      bindToController: true
    };
    return ddo;
  }

  function FoundDirectiveController() {
    var found = this;
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var narrow = this;
    narrow.found = [];
    narrow.term = "";
    var promise = MenuSearchService.getItems();
    promise.then(function (response) {
      narrow.items = response.data['menu_items'];
      // console.log(narrow.items);
    })
    .catch(function (error) {
      console.log("Error in the get of items" + error);
    });

    narrow.find = function () {
      narrow.found = [];
      var term = narrow.term.toLowerCase();
      if (term === "") {
        narrow.found = [];
      }else{
        for (var i = 0, l = narrow.items.length; i < l; i ++) {
          var item = narrow.items[i];
          if (item.description.toLowerCase().indexOf(term) !== -1) {
            narrow.found.push(item);
          }
        }
      }
    }

    narrow.removeItem = function (indexItem) {
      narrow.found.splice(indexItem, 1);
      // console.log(indexItem);
    };

  }

  MenuSearchService.$inject = ['$http','ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;
    var items = [];
    service.getItems = function () {
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      });
      return response;
    };
  }

})();
