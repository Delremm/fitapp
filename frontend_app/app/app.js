'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.str_estimation',
  'myApp.version',
  'myApp.directives',
  'myApp.services'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);



var INTEGER_REGEXP = /^\-?\d*$/;
var FLOAT_REGEXP = /^\-?\d+((\.|\,)\d+)?$/;

angular.module('myApp.directives', []).directive('integer', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function(viewValue) {
        if (INTEGER_REGEXP.test(viewValue)) {
          // it is valid
          ctrl.$setValidity('integer', true);
          return viewValue;
        } else {
          // it is invalid, return undefined (no model update)
          ctrl.$setValidity('integer', false);
          return undefined;
        }
      });
    }
  };
}).directive('smartFloat', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function(viewValue) {
        if (FLOAT_REGEXP.test(viewValue)) {
          ctrl.$setValidity('float', true);
          return parseFloat(viewValue.replace(',', '.'));
        } else {
          ctrl.$setValidity('float', false);
          return undefined;
        }
      });
    }
  };
}).directive('description', ['$http', '$templateCache', function ($http, $templateCache){
  return {
    restrict: 'A',
    link: function(scope, elm, attrs){
      function load_description(){
        var desc_url = '/texts/'+attrs.descSlug+'/';
        $('#'+attrs.descDestinationId).html('Загрузка...');
        $http.get(desc_url, { cache: $templateCache }).success(function(data) {
            $('#'+attrs.descDestinationId).html(data);
            $('#'+attrs.descDestinationId).append($(elm).find("div.description").html());
        });
      }
      elm.bind('mouseenter', load_description);      
    }
  }
}]);


angular.module('myApp.services', []).factory('getManager', ['$http', function ($http) {
    return {
        get: function(url, callback){
            $http.get(url, {headers:{
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
                'X-Random-Shit':'123123123'
            }}).success(function(data) {
                //data = JSON.parse(data);
                callback(data);
            });
        }
    };
}]);