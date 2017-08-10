var app = angular.module('myApp', ['ngResource']);
app.controller('StoreController',[ '$scope', '$http', 'showcaseService', function($scope, $http, showcaseService) {

    //initial values
    $scope.suppliers = [];
    $scope.orders = [];
    $scope.issues = [];
    $scope.activePage = "suppliers";
    $scope.editSupSelect = "";

    $scope.busyEditing = false;
    $scope.supplierBeingEditedId = [];

    $scope.busyDeleting = false;
    $scope.supplierIdBeingDeleted = -1;

    $scope.creatingNewSupplier = false;
    $scope.newSupplier = [];

    $scope.SuppCurrentPage = 0;
    $scope.SuppPageSize = 10;

    $scope.suppliers = showcaseService.query(function(data) {
      // Do something after service retruns data
      $scope.numberOfPages=function(){
          return Math.ceil(data.length/$scope.SuppPageSize);
      }
    });

    //get orders - TODO move to factory
    $http.get('http://frontendshowcase.azurewebsites.net/api/Orders')
    .then(function(orders) {
        $scope.orders = orders.data;
    });

    //get issues - TODO move to factory
    $http.get('http://frontendshowcase.azurewebsites.net/api/Issues')
    .then(function(issues) {
        $scope.issues = issues.data;
    });

    // Set active page
    $scope.goToPage = function(page){
      $scope.activePage = page;
    };

    // Place a new order
    $scope.orderIssue = function(issue){
      console.log("Ordering this issue " + issue);
      //do something here when orderIssue button is clicked
    };

    // Edit Supplier
    $scope.editSupplier = function(supplier){
      $scope.busyEditing = true;
      $scope.supplierBeingEditedId = supplier
      console.log("Editing this supplier " + supplier.id);
      //do something here when edit supplier is clicked
    };

    // Cancel Supplier Edit
    $scope.cancelSupplierEdit = function(){
      $scope.busyEditing = false;
      $scope.supplierBeingEditedId = [];
    };

    // submitEditedSupplier
    $scope.submitEditedSupplier = function(supplier){
      var editSupplierPromise = showcaseService.update({}, supplier);
      editSupplierPromise.$promise.then(function (data) {
           console.log(data);
           $scope.busyEditing = false;
      });
    };

    $scope.deleteSupplier = function(supplierID){
      $scope.supplierIdBeingDeleted = supplierID;
      $scope.busyDeleting = true;

    };

    $scope.deleteSupplierConfirm = function(){
      // Code that can be used to delete a specific supplier by ID
      $scope.editSupSelect = showcaseService.delete({ id: $scope.supplierIdBeingDeleted }, function() {
        $scope.busyDeleting = false;
        console.log("You have deleted Supplier " + $scope.supplierIdBeingDeleted);
        $scope.supplierIdBeingDeleted = -1;

      });

    };

    $scope.deleteSupplierCancel = function(){
      $scope.busyDeleting = false;
    };

    // create New Supplier
    $scope.createNewSupplier = function(supplier){
      $scope.creatingNewSupplier = true;
      $scope.newSupplier = {  name: '',
                              city: '',
                              reference: ''};
    };

    // Cancel New Supplier
    $scope.cancelNewSupplier = function(){
      $scope.creatingNewSupplier = false;
    };

    // submitEditedSupplier
    $scope.submitNewSupplier = function(supplier){
      var supplierPromise = showcaseService.save({}, supplier);
      supplierPromise.$promise.then(function (data) {
           console.log("new supplier added");
           $scope.creatingNewSupplier = false;
      });
    };


}]);

app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});
