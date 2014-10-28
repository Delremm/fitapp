'use strict';

angular.module('myApp.str_estimation', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/str', {
    templateUrl: 'str_estimation/str_estimation.html',
    controller: 'StrEstimationCtrl'
  });
}])

.controller('StrEstimationCtrl', ['$scope', function($scope) {

    $scope.systemOfMeasurement = 'imperial';
    $scope.exercises = [
        {
            name:"Deadlift",
            callback: one_rep_method_Lombardi,
            weight: '',
            reps: '',
            rm: ''
        }
    ];
    $scope.$watch('exercises', function(){
        console.log($scope.exercises);
        $scope.exercises.forEach(function(exercise){
        exercise.rm = exercise.reps;
            if (exercise.weight && exercise.reps){
                exercise.rm = exercise.callback(exercise.weight, exercise.reps);
            };
        });
    }, true);
    function one_rep_method_Lombardi(w, r){
        return roundHalf(w*Math.pow(r, 0.1))
    }
    function roundHalf(num) {
        num = Math.round(num*2)/2;
        return num;
    }
}]);