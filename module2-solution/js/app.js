(function() {
  'use strict';
  angular.module('ShoppingListCheckOff',[])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var boughtItem = this;
    boughtItem.items = ShoppingListCheckOffService.getBoughtItems();

    boughtItem.toBuy = function (itemIndex) {
      ShoppingListCheckOffService.addToBuyItem(itemIndex);
      ShoppingListCheckOffService.removeBougthItem(itemIndex);
    }
  }

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;
    toBuy.items = ShoppingListCheckOffService.getToBuyItems();

    toBuy.bought = function (itemIndex) {
      ShoppingListCheckOffService.addBoughtItem(itemIndex);
      ShoppingListCheckOffService.removeToBuyItem(itemIndex);
    }
  }

  function ShoppingListCheckOffService() {
    var service = this;

    // List of items
    service.toBuyItems  = [];
    service.boughtItems = [];

    for (var i = 0 ; i < 5; i++){
      var item = {
        name: "Cookies",
        quantity: 10
      };
      service.toBuyItems.push(item);
    }

    service.addBoughtItem = function (itemIndex) {
      var item = service.toBuyItems[itemIndex];
      service.boughtItems.push(item);
    };

    service.addToBuyItem = function (itemIndex) {
      var item = service.boughtItems[itemIndex];
      service.toBuyItems.push(item);
    };

    service.removeToBuyItem = function (itemIdex) {
      service.toBuyItems.splice(itemIdex, 1);
    };

    service.removeBougthItem = function (itemIdex) {
      service.boughtItems.splice(itemIdex, 1);
    };

    service.getToBuyItems = function () {
      return service.toBuyItems;
    };
    service.getBoughtItems = function () {
      return service.boughtItems;
    };
  }

})();
