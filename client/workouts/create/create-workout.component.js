Workoutfit
    .directive('createWorkout', function(){
        return {
            restrict: 'E',
            templateUrl: 'client/workouts/create/create-workout.html',
            controllerAs: 'createWorkout',
            controller: function($scope, $stateParams, $reactive){
                $reactive(this).attach($scope);
            }
        }
    });
