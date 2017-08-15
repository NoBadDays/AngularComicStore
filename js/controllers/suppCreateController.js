var app = angular.module('myApp.supplier');

app.controller('SupplierCreateCtrl', function ($uibModal, $document) {
  var $ctrl = this;

  $ctrl.open = function (size, parentSelector) {
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: './html/modalCreateSup.html',
      controller: 'ModalSuppCreateInstanceCtrl',
      controllerAs: '$ctrl',
      size: size,
      resolve: {}
    });

    modalInstance.result.then(function () {
      //modal dismissed
    }, function () {
      console.log("Modal dismissed");
    });
  };

});

app.controller('ModalSuppCreateInstanceCtrl',['$uibModalInstance', 'showcaseService', function ($uibModalInstance, showcaseService) {
  var $ctrl = this;

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  // submitEditedSupplier
  $ctrl.submitNewSupplier = function(supplier){
    var supplierPromise = showcaseService.save({action: "Suppliers"}, supplier);
    supplierPromise.$promise.then(function (data) {
         console.log("new supplier added");
         $uibModalInstance.close();
    });
  };

}]);